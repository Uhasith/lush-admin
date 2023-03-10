const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object()
    .keys({
      status: Joi.string().required(),
      products: Joi.array()
        .items(
          Joi.object().keys({
            product: Joi.required().custom(objectId),
            buyer: Joi.required().custom(objectId),
            qty: Joi.string().required(),
            price: Joi.string().required(),
            isPickUp: Joi.boolean().required(),
            status: Joi.string().required(),
          })
        )
        .min(1),
      totalPrice: Joi.string().required(),
      shippingDetails: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        address1: Joi.string().required(),
        address2: Joi.string().required(),
        country: Joi.string().required(),
        zip: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.string().required(),
      }),
      buyer: Joi.required().custom(objectId),
    })
    .required(),
};

module.exports = {
  createOrder,
};
