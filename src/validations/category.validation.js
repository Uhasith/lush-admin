const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    subCategories: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string(),
        })
      )
      .min(1),
    description: Joi.string(),
    createdBy: Joi.string(),
    status: Joi.string().required().valid('Active', 'Inactive'),
  }),
};

const getCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    status: Joi.string().valid('Active', 'Inactive'),
    sortBy: Joi.string(),
    createdBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      subCategories: Joi.array().items(
        Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().required(),
        })
      ),
      description: Joi.string(),
      status: Joi.string().valid('Active', 'Inactive'),
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
