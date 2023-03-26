/* eslint-disable import/order */
const { payment } = require('../config/config');
const logger = require('../config/logger');

const stripe = require('stripe')(payment.stripeSecretKey, {
  apiVersion: '2022-08-01',
});
const { Payment } = require('../models');

const getCharge = async (paymentIntentId) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  const chargeObj = paymentIntent.charges.data[0];
  const data = {
    chargeId: chargeObj.id,
    curency: chargeObj.currency,
    status: chargeObj.status,
    amount: chargeObj.amount,
  };

  return data;
};

const createPayment = async ({ order, paymentIntent }) => {
  const chargeObj = await getCharge(paymentIntent);
  logger.info(`✓ Charge object received...`);

  const paymentObj = {
    order,
    amount: chargeObj.amount,
    paymentIntentId: paymentIntent,
    chargeId: chargeObj.chargeId,
    curency: chargeObj.curency,
    status: chargeObj.status,
  };

  return Payment.create(paymentObj);
};

const queryPayments = async (filter, options) => {
  const payments = await Payment.paginate(filter, options);
  return payments;
};

const getPaymentByOrderId = async (orderId) => {
  const payments = await Payment.find({ order: orderId });
  if (!payment) {
    throw new Error('Order not found');
  }
  return payments[0];
};

const refundPayment = async (orderId) => {
  const foundPayment = await getPaymentByOrderId(orderId);
  await stripe.refunds.create({
    payment_intent: foundPayment.paymentIntentId,
  });

  logger.info(`✓ Payment refund successful...`);
};

module.exports = {
  queryPayments,
  createPayment,
  refundPayment,
};
