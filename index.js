const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const allProductDataRoutes = require("./routes/v1/allProducts.route.js");
// const jwt = require('jsonwebtoken');
const verifyJwt = require("./middleware/verifyJwt");
const errorHandler = require("./middleware/errorHandler");
const {connectToServer, connect} = require("./utils/dbConnect.js")



//middle ware 
app.use(cors());
app.use(express.json());


// app label middleware function call
// app.use(verifyJwt);

// route label middleware function call
// verifyJwt;


//db connect

// connect();

connectToServer((err)=>{
  if(!err){
    app.listen(port,()=>{
    console.log('your server running port is ', port)
})

  }else{
    console.log(err);
  }
}); 


app.use("/api/v1/allProductData", allProductDataRoutes);
//others route call here





app.get('/', async(req, res)=>{
    res.send('server is running...')
})

//all error handle
app.use(errorHandler);

//all route handle
app.all("*", (req, res)=>{
    res.send("NO Route Found..")
})

// app.listen(port,()=>{
//     console.log('your server running port is ', port)
// })


process.on("unhandledRejection", (error)=>{
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  })
})
