const express = require('express');
const validate = require('../../middlewares/validate');
const { orderValidation } = require('../../validations');
const { orderController } = require('../../controllers');

const router = express.Router();

router.route('/').post(validate(orderValidation.createOrder), orderController.createOrder).get(orderController.getOrders);
router.route('/:orderId').get(orderController.getOrder).patch(orderController.updateOrder);

module.exports = router;
