const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { farmService } = require('../services');
const ApiError = require('../utils/ApiError');

const createFarm = catchAsync(async (req, res) => {
  const farm = await farmService.createFarm(req.body);

  res.status(httpStatus.CREATED).send(farm);
});

const getFarms = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', , 'status']);
  const options = { ...pick(req.query, ['sortBy', 'limit', 'page']), populate: 'farmers.farmer' }; //populate farmer

  const result = await farmService.queryFarms(filter, options);
  res.send(result);
});

const getFarm = catchAsync(async (req, res) => {
  const farm = await farmService.getFarmById(req.params.farmId);
  if (!farm) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Farm not found');
  }
  res.send(farm);
});

const updateFarm = catchAsync(async (req, res) => {
  const farm = await farmService.updateFarmById(req.params.farmId, req.body);
  res.send(farm);
});

const deleteFarm = catchAsync(async (req, res) => {
  await farmService.deleteFarmById(req.params.farmId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFarm,
  getFarms,
  getFarm,
  updateFarm,
  deleteFarm,
};
