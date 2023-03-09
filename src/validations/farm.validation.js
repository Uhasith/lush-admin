const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFarm = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    postalCode: Joi.string().required(),
    openEndTime: Joi.string().required(),
    location: Joi.object()
      .keys({
        type: Joi.string().required().valid('Point'),
        coordinates: Joi.array().items(Joi.number().required()).min(2).required(),
      })
      .required(),
    farmers: Joi.array().items(Joi.string().custom(objectId)).min(1),
  }),
};

const getFarm = {
  params: Joi.object().keys({
    farmId: Joi.string().custom(objectId),
  }),
};

const getFarms = {
  query: Joi.object().keys({
    name: Joi.string(),
    status: Joi.string().valid('Active', 'Inactive'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateFarm = {
  params: Joi.object().keys({
    farmId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      address: Joi.string(),
      postalCode: Joi.string(),
      openEndTime: Joi.string(),
      farmers: Joi.array()
        .items(
          Joi.object().keys({
            farmer: Joi.string().custom(objectId),
          })
        )
        .min(1),
      location: Joi.object().keys({
        type: Joi.string().required().valid('Point'),
        coordinates: Joi.array().items(Joi.number().required()).min(2).required(),
      }),
    })
    .min(1),
};

const deleteFarm = {
  params: Joi.object().keys({
    farmId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFarm,
  getFarms,
  updateFarm,
  deleteFarm,
  getFarm,
};
