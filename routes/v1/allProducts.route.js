
const express = require("express");
const allProductController = require("../../controllers/allProducts.controller");

const router = express.Router();

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
  .get(allProductController.getCategoryProducts)
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
  .post(allProductController.postAllProducts);

router.get("/populler", allProductController.getPopullerProduct);
router.get("/searchData", allProductController.getSearchByProducts);

router.route("/:id")
  .get(allProductController.getProductsDetails)
  .delete(allProductController.deleteProduct);
//   .patch(allProductController.updateProduct);

module.exports = router;





