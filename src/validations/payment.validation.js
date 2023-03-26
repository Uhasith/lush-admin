const Joi = require('joi');

const makePayment = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
  }),
};

module.exports = {
  makePayment,
};
