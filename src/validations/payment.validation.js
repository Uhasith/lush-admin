const Joi = require('joi');
const { objectId } = require('./custom.validation');

const makePayment = {
  body: Joi.object().keys({
    worker: Joi.required().custom(objectId),
    startDate: Joi.string(),
    endDate: Joi.string(),
  }),
};

module.exports = {
  makePayment,
};
