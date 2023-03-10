/* eslint-disable import/order */
const mongoose = require('mongoose');

const { orderStatuses } = require('../config/order');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { toJSON, paginate } = require('./plugins');

const orderProduct = new mongoose.Schema(
  {
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      required: true,
    },
    buyer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    isPickUp: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: orderStatuses,
      default: 'Pending',
    },
  },
  { _id: false }
);

const shippingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  address1: {
    type: String,
    required: true,
    trim: true,
  },
  address2: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  zip: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
});

const orderSchema = mongoose.Schema(
  {
    products: { type: [orderProduct], default: [] },
    totalPrice: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: orderStatuses,
      default: 'Pending',
    },
    shippingDetails: {
      type: shippingSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);
orderSchema.plugin(AutoIncrement, { inc_field: 'orderId' });

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
