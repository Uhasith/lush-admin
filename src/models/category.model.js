const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { categoryStatuses } = require('../config/category');
const { toJSON, paginate } = require('./plugins');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: 'N/A',
      required: true,
    },
  },
  { _id: false }
);

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    categoryId: {
      type: Number,
    },
    subCategories: { type: [subCategorySchema] },
    status: {
      type: String,
      enum: categoryStatuses,
      default: 'Active',
      required: true,
    },
    description: {
      type: String,
      default: 'N/A',
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
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);
categorySchema.plugin(AutoIncrement, { inc_field: 'categoryId' });

/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
