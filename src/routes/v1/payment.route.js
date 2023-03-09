const express = require('express');

const { paymentController } = require('../../controllers');

const router = express.Router();

router.route('/').get(paymentController.makePayment);
router.route('/config').get(paymentController.getConfig);
router.route('/create-payment-intent').post(paymentController.makePayment);

module.exports = router;
