const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const farmerSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { _id: false }
);

const farmSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    farmers: { type: [farmerSchema], default: [] },
    location: {
      type: locationSchema,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    postalCode: {
      type: String,
      trim: true,
      required: true,
    },
    openEndTime: {
      type: String,
      trim: true,
      default: '08:00 - 18:00',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
farmSchema.plugin(toJSON);
farmSchema.plugin(paginate);

/**
 * @typedef Farm
 */
const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;

// POST request to create the time log record with required fields
// PATCH request to update the created record by providing the previously created recordId and other remaining fields
