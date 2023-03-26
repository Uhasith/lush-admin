/* eslint-disable no-unused-vars */
/* eslint-disable no-sparse-arrays */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { orderService, paymentService } = require('../services');
const ApiError = require('../utils/ApiError');

const createOrder = catchAsync(async (req, res) => {
  const { orderData, paymentData } = req.body;
  const order = await orderService.createOrder(orderData);
  const payment = await paymentService.createPayment({ ...paymentData, ...{ order: order._id } });

  res.status(httpStatus.CREATED).send({ order, payment });
});

const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['updatedAt', 'status', 'buyer']);
  const options = { ...pick(req.query, ['sortBy', 'limit', 'page']), populate: 'products.buyer , products.product , buyer' };
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const updateOrder = catchAsync(async (req, res) => {
  if (req.body.status === 'Cancelled') {
    await paymentService.refundPayment(req.params.orderId);
  }
  const order = await orderService.updateOrderById(req.params.orderId, req.body);

  res.send(order);
});

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
};
