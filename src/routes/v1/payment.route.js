const express = require('express');

const { paymentController } = require('../../controllers');
const paymentValidation = require('../../validations/payment.validation');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.route('/').get(paymentController.getPayments);
router.route('/config').get(paymentController.getConfig);
router.route('/create-payment-intent').post(validate(paymentValidation.makePayment), paymentController.makePayment);

module.exports = router;
