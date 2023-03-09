const express = require('express');
const validate = require('../../middlewares/validate');
const { farmValidation } = require('../../validations');
const { farmController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(farmValidation.createFarm), farmController.createFarm)
  .get(validate(farmValidation.getFarms), farmController.getFarms);
router
  .route('/:farmId')
  .get(validate(farmValidation.getFarm), farmController.getFarm)
  .patch(validate(farmValidation.updateFarm), farmController.updateFarm)
  .delete(validate(farmValidation.deleteFarm), farmController.deleteFarm);

module.exports = router;
