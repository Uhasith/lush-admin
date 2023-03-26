/* eslint-disable import/order */
const { payment } = require('../config/config');
const pick = require('../utils/pick');

const stripe = require('stripe')(payment.stripeSecretKey, {
  apiVersion: '2022-08-01',
});

const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');

const getConfig = catchAsync(async (req, res) => {
  res.send({
    publishableKey: payment.stripePublishableKey,
  });
});

const getPayments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'status']);
  const options = { ...pick(req.query, ['sortBy', 'limit', 'page']), populate: 'order' };

  const result = await paymentService.queryPayments(filter, options);
  res.send(result);
});

const makePayment = catchAsync(async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    currency: 'EUR',
    amount,
    automatic_payment_methods: { enabled: true },
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});

module.exports = {
  makePayment,
  getConfig,
  getPayments,
};
