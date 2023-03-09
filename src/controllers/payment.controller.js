const { payment } = require('../config/config');

const stripe = require('stripe')(payment.stripeSecretKey, {
  apiVersion: '2022-08-01',
});

const catchAsync = require('../utils/catchAsync');

const loadPaymentScreen = catchAsync(async (req, res) => {
  res.send({ clientSecret: paymentIntent.client_secret });
});

const getConfig = catchAsync(async (req, res) => {
  res.send({
    publishableKey: payment.stripePublishableKey,
  });
});

const makePayment = catchAsync(async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    currency: 'EUR',
    amount: 2999,
    automatic_payment_methods: { enabled: true },
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});

module.exports = {
  makePayment,
  loadPaymentScreen,
  getConfig,
};
