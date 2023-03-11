const httpStatus = require('http-status');
const { Farm } = require('../models');
const ApiError = require('../utils/ApiError');
const _ = require('lodash');
const documentService = require('./document.service');

/**
 * Create a farm
 * @param {Object} farmBody
 * @returns {Promise<Farm>}
 */
const createFarm = async (farmBody) => {
  return Farm.create(farmBody);
};

/**
 * Query for farms
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFarms = async (filter, options) => {
  const farms = await Farm.paginate(filter, options);

  const updatedFarms = [];
  if (!farms?.results?.length > 0) return farms;

  for await (const { openEndTime, name, location, address, postalCode, farmers, createdAt, id } of farms?.results) {
    if (!farms?.results?.length > 0) return farms;
    const updatedFarmers = [];
    for await (const { farmer } of farmers) {
      const documents = await documentService.getProfilePicByOwner(farmer?._id, 'Worker');
      const docKey = documents.length > 0 ? documents[0]?.docKey : null;
      updatedFarmers.push({ id: farmer?._id, firstName: farmer?.firstName, lastName: farmer?.lastName, profilePic: docKey });
    }

    updatedFarms.push({ openEndTime, name, location, address, postalCode, farmers: updatedFarmers, createdAt, id });
  }
  farms.results = updatedFarms;
  return farms;
};

/**
 * Get farm by id
 * @param {ObjectId} id
 * @returns {Promise<Farm>}
 */
const getFarmById = async (id) => {
  let foundFarm = await Farm.findById(id).populate('farmers.farmer');
  const _farmers = foundFarm.farmers || [];
  if (!_farmers?.length > 0) return foundFarm;

  const updatedFarmers = [];
  for await (const { farmer } of _farmers) {
    const documents = await documentService.getProfilePicByOwner(farmer?._id, 'Worker');
    const docKey = documents.length > 0 ? documents[0]?.docKey : null;

    updatedFarmers.push({ id: farmer?._id, firstName: farmer?.firstName, lastName: farmer?.lastName, profilePic: docKey });
  }

  const updatedFarm = {
    farmers: updatedFarmers,
    id: foundFarm?.id,
    name: foundFarm?.name,
    address: foundFarm?.address,
    openEndTime: foundFarm?.openEndTime,
    location: foundFarm?.location,
    postalCode: foundFarm?.postalCode,
  };

  return updatedFarm;
};

/**
 * Update farm by id
 * @param {ObjectId} farmId
 * @param {Object} updateBody
 * @returns {Promise<Farm>}
 */
const updateFarmById = async (farmId, updateBody, _user) => {
  const farm = await Farm.findById(farmId).populate('farmers.farmer');
  if (!farm) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Farm not found');
  }

  if (updateBody?.farmers) {
    const prevFarmers = [];
    farm?.farmers?.map(({ farmer }) => prevFarmers.push({ farmer: farmer._id }));
    const newFarmer = [{ farmer: _user?._id }];

    const updatedFarmers = _.unionBy(prevFarmers, newFarmer, 'farmer');
    updateBody.farmers = updatedFarmers;
  }

  Object.assign(farm, updateBody);
  await farm.save();
  return farm;
};

/**
 * Delete farm by id
 * @param {ObjectId} farmId
 * @returns {Promise<Farm>}
 */
const deleteFarmById = async (farmId) => {
  const farm = await getFarmById(farmId);
  if (!farm) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Farm not found');
  }
  await farm.remove();
  return farm;
};

module.exports = {
  createFarm,
  queryFarms,
  getFarmById,
  updateFarmById,
  deleteFarmById,
};
