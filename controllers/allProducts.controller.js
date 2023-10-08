// const { getDb } = require("../utils/dbConnect")
const {getClient} = require("../utils/dbConnect");

module.exports.getAllProducts = (req, res)=>{
    res.send("all product get api")
}


module.exports.postAllProducts = async(req, res)=>{
    try {
    const client = getClient(); 
    const product = req.body;
    const result = await client.collection("allProductData").insertOne(product);
    console.log(result);
    res.send("successful");
    // Use the existing database client
    
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
    // try {
    // const db = getDb();
    // const product = req.body;
    // const result = await db.collection("allProductData").insertOne(product);
    // console.log(result);
    // res.send("successful");
        
    // } catch (error) {
        
    // }
    // res.send("all product post ")
}

module.exports.getProductsDetails = (req, res)=>{
    res.send("all product get by id ")
}
module.exports.deleteProduct = (req, res)=>{
    res.send("all product delete api")
}
module.exports.updateProduct = (req, res)=>{
    res.send("all product update product api")
}

