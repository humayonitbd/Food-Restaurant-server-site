
const {connectToServer, getDb} = require("../utils/dbConnect");

module.exports.getCategorys = async(req, res)=>{
    try {
      const db = getDb(); 
      // const products = await db.collection("allProductData").find().skip(1).limit(1).toArray();
      const categorys = await db.collection("categorys").find().toArray();
      res.status(200).json({success: true, data:categorys})
    } catch (error) {
      next(error)
    }
}






