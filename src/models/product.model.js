const mongoose = require('mongoose');

const { productStatuses } = require('../config/product');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    unitType: {
      type: String,
      default: 'Each',
    },
    weight: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: productStatuses,
      default: 'Pending',
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Category',
    },
    subCategories: {
      type: [String],
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
productSchema.plugin(AutoIncrement, { inc_field: 'productId' });

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
