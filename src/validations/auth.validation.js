const Joi = require('joi');
const { password, mobile, objectId } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    phoneNumber: Joi.string().required().custom(mobile),
    address: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    userType: Joi.string().required().valid('Farmer', 'Other', 'Visitor'),
    farm: Joi.object()
      .keys({
        nearestMarket: Joi.string().required(),
        name: Joi.string().required(),
        postalCode: Joi.string().required(),
        openTime: Joi.string()
          .regex(/^([0-9]{2})\:([0-9]{2})$/)
          .required(),
        closeTime: Joi.string()
          .regex(/^([0-9]{2})\:([0-9]{2})$/)
          .required(),
      })
      .optional(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const checkEmail = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const checkUserStatus = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  checkEmail,
  checkUserStatus,
};
