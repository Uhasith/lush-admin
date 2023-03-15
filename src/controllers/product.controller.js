const httpStatus = require('http-status');
const _ = require('lodash');
const { Product } = require('../models');

const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

//  Admin product routes
const createProducts = catchAsync(async (req, res) => {
  const products = await productService.createProducts(
    req.body.map((product) => ({ ...product, createdBy: req?.user?._id }))
  );
  res.status(httpStatus.CREATED).send(products);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'name', 'createdBy']);
  const options = {
    ...pick(req.query, ['sortBy', 'limit', 'page']),
    //sortBy: '-createdAt',
    populate: 'category, createdBy'
  }; // populate category
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

function flowFilter(array, substr) {
  return _.filter(
    JSON.parse(array),
    _.flow(_.identity, _.values, _.join, _.toLower, _.partialRight(_.includes, substr.toLowerCase()))
  );
}

const searchProducts = catchAsync(async (req, res) => {
  const { product } = req?.query;
  const results = await Product.find().populate({ path: 'category' });

  const pSearchedItems = product ? flowFilter(JSON.stringify(results), product) : results;

  res.send(pSearchedItems);
});

const searchProductsByMarket = catchAsync(async (req, res) => {
  const { marketId } = req?.params;

  const products = await await Product.find().populate({ path: 'category, createdBy' });
  const _products = products?.filter((obj) => obj?.createdBy?.farm == marketId);
  res.send(_products);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProducts,
  updateProduct,
  getProducts,
  getProduct,
  deleteProduct,
  searchProducts,
  searchProductsByMarket,
};
