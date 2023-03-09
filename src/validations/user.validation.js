const Joi = require('joi');
const { password, objectId, mobile } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required().custom(mobile),
    address: Joi.string().required(),
    email: Joi.string().required().email(),
    farm: Joi.string().custom(objectId),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid('Worker', 'Admin', 'Visitor'),
    userType: Joi.string().required().valid('Farmer', 'Other', 'Visitor'),
    status: Joi.string().required().valid('Active', 'Pending', 'Reviewing', 'Deactivated'),
  }),
};

const sendEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    subject: Joi.string().required(),
    text: Joi.string().required(),
    attachment: Joi.string().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    firstName: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      farm: Joi.string().custom(objectId),
      password: Joi.string().custom(password),
      firstName: Joi.string(),
      lastName: Joi.string(),
      userType: Joi.string(),
      status: Joi.string().valid('Active', 'Pending', 'Reviewing', 'Deactivated'),
      phoneNumber: Joi.string(),
      address: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  sendEmail,
};
