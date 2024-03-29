
const express = require("express");
const  categorys  = require("../../controllers/categorys.controller");

const router  = express.Router();


// router.get("/", (req, res)=>{
//     res.send("allProduct data get id  hoise")
// })

// router.post("/", (req, res)=>{
//     res.send("allProduct data post hoise")
// })

router.route("/")
/**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
.get(categorys.getCategorys)
/**
   * @api {post} /tools save a tool
   * @apiDescription post all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
// .post(allProductController.postAllProducts);

// router.route("/:id")
// .get(allProductController.getProductsDetails)
// .patch(allProductController.updateProduct)
// .delete(allProductController.deleteProduct)

module.exports = router;