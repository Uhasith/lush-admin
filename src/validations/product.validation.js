const Joi = require('joi');
const { objectId } = require('./custom.validation');

// admin product routes validations
const createProducts = {
  body: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.string().required(),
      description: Joi.string().required(),
      weight: Joi.string().required(),
      unitType: Joi.string().required(),
      category: Joi.required().custom(objectId),
      subCategories: Joi.array().items(Joi.string()).required(),
      images: Joi.array().items(Joi.string()).required(),
      status: Joi.string().required().valid('Pending', 'Active', 'Reviewing', 'Deactivated'),
    })
  ),
};



const getProducts = {
  query: Joi.object().keys({
    status: Joi.string(),
    name: Joi.string(),
    createdBy: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const searchProducts = {
  query: Joi.object().keys({
    product: Joi.string(),
    category: Joi.string(),
  }),
};

const searchProductsByMarket = {
  params: Joi.object().keys({
    marketId: Joi.string().custom(objectId),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      price: Joi.string(),
      image: Joi.string(),
      description: Joi.string(),
      weight: Joi.string(),
      unitType: Joi.string(),
      hasPromotion: Joi.boolean(),
      category: Joi.custom(objectId),
      subCategories: Joi.array().items(Joi.string()),
      images: Joi.array().items(Joi.string()),
      status: Joi.string().valid('Pending', 'Active', 'Reviewing', 'Deactivated'),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  searchProductsByMarket,
};
