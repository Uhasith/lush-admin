const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');
const { productController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('manageProducts'), validate(productValidation.createProducts), productController.createProducts)
  .get(validate(productValidation.getProducts), productController.getProducts);

router
  .route('/:productId')
  .get(validate(productValidation.getProduct), productController.getProduct)
  .patch(validate(productValidation.updateProduct), productController.updateProduct)
  .delete(validate(productValidation.deleteProduct), productController.deleteProduct);

router.route('/total/search').get(validate(productValidation.searchProducts), productController.searchProducts);
router
  .route('/search/market/:marketId')
  .get(validate(productValidation.searchProductsByMarket), productController.searchProductsByMarket);

module.exports = router;
