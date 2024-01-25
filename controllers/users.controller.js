
const { ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
const {connectToServer, getDb} = require("../utils/dbConnect");
const { v4: uuidv4 } = require('uuid');

module.exports.getAllUsers = async(req, res)=>{
    try {
      console.log("All user route hit")
      const db = getDb(); 
      // const products = await db.collection("allProductData").find().skip(1).limit(1).toArray();
      const users = await db.collection("users").find().toArray();
      res.status(200).json({success: true, data:users})
    } catch (error) {
      next(error)
    }
}

module.exports.deleteAllUser = async(req, res)=>{
    try {
     const db = getDb();
      const {id} = req.params;
      if(!ObjectId.isValid(id)){
        return res.status(400).json({success:false, error:"Not a valid Product Id!!"});
      }
      const singleUser = await db.collection("users").deleteOne({_id: new ObjectId(id)});
      if(!singleUser.deletedCount){
        return res.status(400).json({success:false, error:"Could't delete the User!!"})
      }
      res.status(200).json({success:true, message:"successfully deleted User!!!"});
    } catch (error) {
      next(error)
    }
}

module.exports.getUserGmailByOrders = async(req, res)=>{
    try {
      const db = getDb(); 
      const email = req.query.email;
      // console.log(email);
      const userOrder = await db.collection("users").findOne({ email:email });
      res.status(200).json({success: true, data:userOrder})
    } catch (error) {
      next(error)
    }
}


module.exports.handleOrders = async (req, res, next) => {
  try {
    console.log("orders route hit hoise");
    const db = getDb();
    const email = req.query.email;
    const userInfo = req.body;
    const orderMainIdPending = req.body.orderMainIdPending;
    // Generate a random UUID
    const orderMainId = uuidv4();
    // Finding user with the given email
    const user = await db.collection("users").findOne({ email: email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        status: false,
        message: `User not found with email ${email}`,
      });
    }

    let favoriteResult;

    if (!orderMainIdPending) {
      // Update the user's document to push the order with the generated orderId
      favoriteResult = await db.collection("users").updateOne(
        { email: email },
        { $push: { orders: { ...userInfo, orderMainId } } }
      );
    } else {
      // Update the user's document to push the order
      favoriteResult = await db.collection("users").updateOne(
        { email: email },
        { $push: { orders: { ...userInfo, orderMainId } } }
      );

      // Update the specific favorite item based on orderMainIdPending
      const updateResult = await db.collection("users").updateOne(
        { "favorites.orderMainId": orderMainIdPending },
        { $set: { "favorites.$.status": "Conform" } }
      );
    }

    // Check if any document was modified
    if (favoriteResult.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Something went wrong! User document not updated.`,
      });
    }

    res.json({
      success: true,
      message: "Successfully Conform order!",
      data: favoriteResult,
    });
  } catch (error) {
    next(error);
  }
};






module.exports.handleDeleteOrders = async (req, res, next) => {
  try {
    console.log("delete route hit hoise ");
    const db = getDb();
    const {id} = req.params;
    const  email  = req.body.email;
    console.log("email",email,"id",id)
    // Finding user with the given email
    const user = await db.collection("users").findOne({ email: email });
    console.log("user", user);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        status: false,
        message: `User not found with email ${email}`,
      });
    }

    // Update the user's document to push the order
    const updateResult = await db.collection("users").updateOne(
      { email: email },
      { $pull: { orders: {orderMainId:id} } }
    );

    // Check if any document was modified
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Something went wrong! User document not updated.`,
      });
    }

    res.json({
      success: true,
      message: "Successfully Deleted order!",
      data: updateResult,
    });
  } catch (error) {
    next(error);
  }
};


module.exports.PaymentProductHandler = async (req, res, next) => {
  try {
    console.log("payment handler hit hoise");
    const db = getDb();
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, error: "Not a valid Product Id!!" });
    }

    const payOrder = req.body;
    const email = req.body.email;
    const filter = { "orders.orderMainId": id, email: email };
    const options = { upsert: true };
    const updatedDoc = {
      $set: { "orders.$.payment": payOrder },
    };

    const result = await db.collection("users").updateOne(filter, updatedDoc, options);

    if (result.modifiedCount === 0) {
      return res.status(400).json({ success: false, error: "Could not update the product payment details." });
    }

    res.status(200).json({ success: true, message: "Your Payment is successfully!!!" });
  } catch (error) {
    next(error);
  }
};


module.exports.handleFavoriteOrders = async (req, res, next) => {
  try {
    console.log("Favorite orders route hit hoise");
    const db = getDb();
    const email = req.query.email;
    const userInfo = req.body;

    // Generate a random UUID
    const orderMainId = uuidv4();

    // Finding user with the given email
    const user = await db.collection("users").findOne({ email: email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        status: false,
        message: `User not found with email ${email}`,
      });
    }

    // Update the user's document to push the order with the generated orderId
    const updateResult = await db.collection("users").updateOne(
      { email: email },
      { $push: { favorites: { ...userInfo, orderMainId } } }
    );

    // Check if any document was modified
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Something went wrong! User document not updated.`,
      });
    }

    res.json({
      success: true,
      message: "Successfully Favorite order!",
      data: updateResult,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.handleFavoriteDeleteOrders = async (req, res, next) => {
  try {
    console.log("delete route hit hoise ");
    const db = getDb();
    const {id} = req.params;
    const  email  = req.body.email;
    // console.log("email",email,"id",id)
    // Finding user with the given email
    const user = await db.collection("users").findOne({ email: email });
    // console.log("user", user);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        status: false,
        message: `User not found with email ${email}`,
      });
    }

    // Update the user's document to push the order
    const updateResult = await db.collection("users").updateOne(
      { email: email },
      { $pull: { favorites: {orderId:id} } }
    );

    // Check if any document was modified
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Something went wrong! User document not updated.`,
      });
    }

    res.json({
      success: true,
      message: "Successfully Unfavorite order!!",
      data: updateResult,
    });
  } catch (error) {
    next(error);
  }
};


module.exports.reportHandlerProduct = async (req, res, next) => {
  try {
    console.log("report orders route hit hoise");
    const db = getDb();
    const email = req.query.email;
    const userInfo = req.body;

    // Generate a random UUID
    const orderMainId = uuidv4();

    // Finding user with the given email
    const user = await db.collection("users").findOne({ email: email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        status: false,
        message: `User not found with email ${email}`,
      });
    }

    // Update the user's document to push the order with the generated orderId
    const updateResult = await db.collection("users").updateOne(
      { email: email },
      { $push: { reports: { ...userInfo, orderMainId } } }
    );

    // Check if any document was modified
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Something went wrong! User document not updated.`,
      });
    }

    res.json({
      success: true,
      message: "Successfully Reported Product !!",
      data: updateResult,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.handleReportDeleteProduct = async (req, res, next) => {
  try {
    console.log("delete route hit hoise ");
    const db = getDb();
    const {id} = req.params;
    const  email  = req.body.email;
    // console.log("email",email,"id",id)
    // Finding user with the given email
    const user = await db.collection("users").findOne({ email: email });
    // console.log("user", user);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        status: false,
        message: `User not found with email ${email}`,
      });
    }

    // Update the user's document to push the order
    const updateResult = await db.collection("users").updateOne(
      { email: email },
      { $pull: { reports: {orderMainId:id} } }
    );
    

    // Check if any document was modified
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `Something went wrong! User document not updated.`,
      });
    }

    res.json({
      success: true,
      message: "Successfully Delete Reported Product!!",
      data: updateResult,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.postAllUsers = async(req, res, next)=>{
    try {
    const db = getDb(); 
    const user = req.body;
    const result = await db.collection("users").insertOne(user);
    if(!result.insertedId){
      return res.status(400).send({status:false, error:"something went rong!!"})
    }

    res.send({success: true, message:"successful added Users!!"});
    
    // console.log(result);
    // Use the existing database client
    
  } catch (error) {
    next(error);
  }
    
}

module.exports.putGoogleAllUsers = async(req, res, next)=>{
    try {
    const db = getDb(); 
    const user = req.body;
    const email = req.body.email;
            const filter = {email: email};
                const options = { upsert: true };
                const updatedDoc = {
                    $set:user,
                }

    const result = await db.collection("users").updateOne(filter, updatedDoc, options);
    if(!result.insertedId){
      return res.status(400).send({status:false, error:"something went rong!!"})
    }

    res.send({success: true, message:"successful added Users!!"});
    
    // console.log(result);
    // Use the existing database client
    
  } catch (error) {
    next(error);
  }
    
}

// module.exports.getProductsDetails = async(req, res, next)=>{
//     try {
//       const db = getDb();
//       const {id} = req.params;
//       if(!ObjectId.isValid(id)){
//         return res.status(400).json({success:false, error:"Not a valid Product Id!!"});
//       }
//       const singleProduct = await db.collection("allProductData").findOne({_id: new ObjectId(id)})
//       if(!singleProduct){
//         return res.status(400).json({success:false, error:"Could't find a product with this ID!!"})
//       }
//       res.status(200).json({success:true, data:singleProduct});


//     } catch (error) {
//       next(error);
//     }

// }

module.exports.handleJwt = async (req, res, next) => {
  try {
    console.log("JWT route hit");

    const db = getDb();
    const email = req.query.email;

    const user = await db.collection("users").findOne({ email });
    console.log("email",email, "user.email" ,user.email)

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        status: false,
        message: `User not found with email ${email}`,
      });
    }

    // Generate JWT token for the user
    const token = jwt.sign({ email }, process.env.ACCESS_JWT_TOKEN);

    // Send the token in the response
    return res.json({ accessToken: token });

  } catch (error) {
    // Handle errors by passing them to the next middleware
    next(error);
  }
};


module.exports.adminHandler = async (req, res, next) => {
  try {
    console.log("admin route hit");
    const db = getDb();
    const email = req.params.email;
    const filter = { email: email };
    const user = await db.collection("users").findOne(filter);
    // console.log("email", email, "user.email", user.email);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        status: false,
        message: `User not found with email ${email}`,
      });
    }

    // Send the isAdmin in the response
    res.status(200).json({ success: true, message: "successful users role!!", isAdmin: user.role });

  } catch (error) {
    // Handle errors by passing them to the next middleware
    next(error);
  }
};


 ///admin role implement 
        // app.get('/users/admin/:email', async(req, res)=>{
        //     const email = req.params.email;
        //     // console.log(email)
        //     const filter = {email: email}
        //     const user = await allUsersCollection.findOne(filter);
        //     res.send({isAdmin: user.role})
        // })