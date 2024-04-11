const express = require('express');
const { upload } = require('../utils/multer');
const { register, activationAccount, login, getUser, logoutUser } = require('../controllers/userCtrl');
const { isAuthenticated } = require('../middlewares/auth');
const uploadMiddleWare = require('../utils/multer');
const router = express.Router();

router.route('/register').post(uploadMiddleWare.single('file'), register)
router.route('/activation').post(activationAccount)
router.route('/login').post(login)
router.route('/me').get(isAuthenticated,getUser)
router.route('/logout').get(isAuthenticated,logoutUser)

module.exports = router;