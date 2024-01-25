const express = require("express");
const allUsersController = require("../../controllers/users.controller");

const router = express.Router();

// router.route("/")
// /**
//  * @api {get} /tools All tools
//  * @apiDescription Get all the tools
//  * @apiPermission admin
//  *
//  * @apiHeader {String} Authorization   User's access token
//  *
//  * @apiParam  {Number{1-}}         [page=1]     List page
//  * @apiParam  {Number{1-100}}      [limit=10]  Users per page
//  *
//  * @apiSuccess {Object[]} all the tools.
//  *
//  * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
//  * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
//  */
//     .get(allUsersController.getUserGmailByOrders)
// /**
//  * @api {post} /tools save a tool
//  * @apiDescription post all the tools
//  * @apiPermission admin
//  *
//  * @apiHeader {String} Authorization   User's access token
//  *
//  * @apiParam  {Number{1-}}         [page=1]     List page
//  * @apiParam  {Number{1-100}}      [limit=10]  Users per page
//  *
//  * @apiSuccess {Object[]} all the tools.
//  *
//  * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
//  * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
//  */
//     .post(allUsersController.postAllUsers)
//     .put(allUsersController.putGoogleAllUsers)
//     .patch(allUsersController.handleOrders)
//     .patch("/favorites", allUsersController.handleFavoriteOrders)
//     .patch("/reports", allUsersController.reportHandlerProduct);

// router.get("/users", allUsersController.getAllUsers);
// router.get("/jwt", allUsersController.handleJwt);

// router.route("/:id")
//     .put(allUsersController.handleDeleteOrders)
//     .patch(allUsersController.PaymentProductHandler);

// router.put("/favorites/:id", allUsersController.handleFavoriteDeleteOrders);
// router.put("/reports/:id", allUsersController.handleReportDeleteProduct);
// router.delete("/users/:id", allUsersController.deleteAllUser);
// router.get("/admin/:email", allUsersController.adminHandler);

// module.exports = router;


// Import necessary modules
// const express = require("express");
// const allUsersController = require("../../controllers/users.controller");

// // Create an Express router
// const router = express.Router();

// // Define route handlers
// router.get("/", allUsersController.getUserGmailByOrders);
// router.post("/", allUsersController.postAllUsers);
// router.put("/", allUsersController.putGoogleAllUsers);
// router.patch("/", allUsersController.handleOrders);
// router.patch("/favorites", allUsersController.handleFavoriteOrders);
// router.patch("/reports", allUsersController.reportHandlerProduct);
// router.get("/users", allUsersController.getAllUsers);
// router.get("/jwt", allUsersController.handleJwt);
// router.put("/:id", allUsersController.handleDeleteOrders);
// router.patch("/:id", allUsersController.PaymentProductHandler);
// router.put("/favorites/:id", allUsersController.handleFavoriteDeleteOrders);
// router.put("/reports/:id", allUsersController.handleReportDeleteProduct);
// router.delete("/users/:id", allUsersController.deleteAllUser);
// router.get("/admin/:email", allUsersController.adminHandler);

// // Export the router
// module.exports = router;

router.route("/")
    .get(allUsersController.getUserGmailByOrders)
    .post(allUsersController.postAllUsers)
    .put(allUsersController.putGoogleAllUsers)
    .patch(allUsersController.handleOrders);

router.route("/favorites")
    .patch(allUsersController.handleFavoriteOrders);

router.route("/reports")
    .patch(allUsersController.reportHandlerProduct);

router.route("/:id")
    .put(allUsersController.handleDeleteOrders)
    .patch(allUsersController.PaymentProductHandler);

router.route("/favorites/:id")
    .put(allUsersController.handleFavoriteDeleteOrders);

router.route("/reports/:id")
    .put(allUsersController.handleReportDeleteProduct);

router.route("/users/:id")
    .delete(allUsersController.deleteAllUser);

router.route("/admin/:email")
    .get(allUsersController.adminHandler);

router.route("/users")
    .get(allUsersController.getAllUsers);

router.route("/jwt")
    .get(allUsersController.handleJwt);

module.exports = router;
