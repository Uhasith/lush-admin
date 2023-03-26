const Joi = require('joi');

const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object({
    orderData: Joi.object({
      products: Joi.array()
        .items(
          Joi.object({
            product: Joi.required().custom(objectId),
            buyer: Joi.required().custom(objectId),
            qty: Joi.number().integer().required(),
            price: Joi.number().required(),
            isPickUp: Joi.boolean().required(),
            status: Joi.string().required(),
          })
        )
        .min(1),
      status: Joi.string().required(),
      totalPrice: Joi.number().required(),
      shippingDetails: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        address1: Joi.string().required(),
        address2: Joi.string().required(),
        country: Joi.string().required(),
        zip: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
      }).required(),
      buyer: Joi.required().custom(objectId),
    }).required(),
    paymentData: Joi.object({
      paymentIntent: Joi.string().required(),
      amount: Joi.number().required(),
    }).required(),
  }),
};

module.exports = {
  createOrder,
};
