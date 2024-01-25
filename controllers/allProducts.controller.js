
const { ObjectId } = require("mongodb");
const {connectToServer, getDb} = require("../utils/dbConnect");

module.exports.getAllProducts = async(req, res)=>{
    try {
      const db = getDb(); 
      // const products = await db.collection("allProductData").find().skip(1).limit(1).toArray();
      const allProducts = await db.collection("allProductsData").find().toArray();
      res.status(200).json({success: true, data:allProducts})
    } catch (error) {
      next(error)
    }
}

module.exports.getCategoryProducts = async(req, res)=>{
    try {
      const db = getDb(); 
      const category = req.query.category;
      // console.log(category);
      const products = await db.collection("allProductsData").find({ $or: [ { category: category }, { subCategory: category } ] }).toArray();
      res.status(200).json({success: true, data:products})
    } catch (error) {
      next(error)
    }
}

module.exports.getSearchByProducts = async (req, res, next) => {
    try {
        const db = getDb();
        const searchText = req.query.searchText;
        const searchProducts = await db.collection("allProductsData").find({ $or: [{ category: searchText }, { name: searchText }] }).toArray();
        res.status(200).json({ success: true, data: searchProducts });
    } catch (error) {
        next(error);
    }
};


module.exports.getPopullerProduct = async(req, res)=>{
    try {
      const db = getDb(); 
      const populler = req.query.populler;
      // console.log(category);
      const products = await db.collection("allProductsData").find({  product: populler  }).toArray();
      res.status(200).json({success: true, data:products})
    } catch (error) {
      next(error)
    }
}


module.exports.postAllProducts = async(req, res, next)=>{
    try {
    const db = getDb(); 
    const product = req.body;
    const result = await db.collection("allProductsData").insertOne(product);
    if(!result.insertedId){
      return res.status(400).send({status:false, error:"something went rong!!"})
    }

    res.send({success: true, message:"successful added Product!!"});
    
    console.log(result);
    // Use the existing database client
    
  } catch (error) {
    next(error);
  }
    
}

module.exports.getProductsDetails = async(req, res, next)=>{
    try {
      const db = getDb();
      const {id} = req.params;
      if(!ObjectId.isValid(id)){
        return res.status(400).json({success:false, error:"Not a valid Product Id!!"});
      }
      const singleProduct = await db.collection("allProductsData").findOne({_id: new ObjectId(id)})
      if(!singleProduct){
        return res.status(400).json({success:false, error:"Could't find a product with this ID!!"})
      }
      res.status(200).json({success:true, data:singleProduct});


    } catch (error) {
      next(error);
    }

}
module.exports.deleteProduct = async (req, res)=>{
    try {
      const db = getDb();
      const {id} = req.params;
      if(!ObjectId.isValid(id)){
        return res.status(400).json({success:false, error:"Not a valid Product Id!!"});
      }
      const singleProduct = await db.collection("allProductsData").deleteOne({_id: new ObjectId(id)})
      if(!singleProduct.deletedCount){
        return res.status(400).json({success:false, error:"Could't delete the Product!!"})
      }
      res.status(200).json({success:true, message:"successfully deleted the Product.."});


    } catch (error) {
      next(error);
    }
}



