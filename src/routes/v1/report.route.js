const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { reportValidation } = require('../../validations');
const { reportController } = require('../../controllers');

const router = express.Router();

router.route('/').get(validate(reportValidation.getReports), reportController.getReports);
router.route('/dashboard').get(reportController.getDashboardData);
router.route('/detailed-chart/:workerId').get(validate(reportValidation.getChartData), reportController.getChartData);

module.exports = router;
