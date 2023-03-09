const express = require('express');

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const messageRoute = require('./message.route');
const reportRoute = require('./report.route');
const documentRoute = require('./document.route');
const categoryRoute = require('./category.route');
const paymentRoute = require('./payment.route');
const farmRoute = require('./farm.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },

  {
    path: '/messages',
    route: messageRoute,
  },
  {
    path: '/report',
    route: reportRoute,
  },
  {
    path: '/documents',
    route: documentRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
  {
    path: '/farms',
    route: farmRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
