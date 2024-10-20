const express = require('express');
const {registerUser, authUser} = require("../controllers/userControllers")
const router = express.Router();
const {allUsers} = require('../controllers/userControllers')
const {protect} = require('../middleware/authMiddleware')



 router.route('/').post(registerUser).get(protect,allUsers)
 router.route('/login').post(authUser)

module.exports= router;

