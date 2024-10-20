const express= require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {sendMessage} = require('../controllers/messageControllers')
const {allMessages} = require('../controllers/messageControllers')


router.route('/').post(protect, sendMessage)
router.route('/:chatId').get(protect,allMessages)

module.exports = router