const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.route("/").post(productController.addProduct);
router.route("/").get(productController.getAllProducts);
router.route("/").patch(productController.updateProduct);
router.route("/single").get(productController.getSingleProduct);
router.route("/").delete(productController.deleteProduct);
router.route("/search").get(productController.searchProduct);
router.route("/spend").patch(productController.spendProduct);

module.exports = router;
