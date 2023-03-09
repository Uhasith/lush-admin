const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { messageValidation } = require('../../validations');
const { messageController } = require('../../controllers');

const router = express.Router();

router.route('/').post(validate(messageValidation.createMessage), messageController.createMessage);
router.route('/').get(validate(messageValidation.getMessages), messageController.getMessages);
router.route('/chat/:userId').get(validate(messageValidation.getChatByUser), messageController.getChatByUser);
router.route('/:userId').patch(validate(messageValidation.updateMessage), messageController.updateMessage);
router.route('/to/:to').get(validate(messageValidation.getMessagesByTo), messageController.getMessagesByTo);
router.route('/from/:from').get(validate(messageValidation.getMessagesByFrom), messageController.getMessagesByFrom);
router.route('/admin-list').get(messageController.getAdminList);

module.exports = router;
