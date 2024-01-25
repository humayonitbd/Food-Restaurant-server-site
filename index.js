const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const allProductDataRoutes = require("./routes/v1/allProducts.route");
const categorys = require("./routes/v1/categorys.route.js");
const allUserRoutes = require("./routes/v1/users.route.js");
const errorHandler = require("./middleware/errorHandler");
const {connectToServer, connect} = require("./utils/dbConnect.js");
const verifyJwt = require("./middleware/verifyJwt.js");



//middle ware 
app.use(cors());
app.use(express.json());


// app label middleware function call
// app.use(verifyJwt);

// route label middleware function call



//db connect

connectToServer((err)=>{
  if(!err){
    app.listen(port,()=>{
    console.log('your server running port is ', port)
})

  }else{
    console.log(err);
  }
}); 


app.use("/api/v1/allProductsData", allProductDataRoutes);
app.use("/api/v1/categorys", categorys);
app.use("/api/v1/users",allUserRoutes);
// app.use("/api/v1/jwt", allUserRoutes);
// app.use("/api/v1/orders", allOrderRoutes);
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


// process.on("unhandledRejection", (error)=>{
//   console.log(error.name, error.message);
//   app.close(() => {
//     process.exit(1);
//   })
// })



