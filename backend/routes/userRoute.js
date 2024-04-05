const express = require('express');
const { upload } = require('../utils/multer');
const { register, activationAccount, login, getUser } = require('../controllers/userCtrl');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.route('/register').post(upload.single("file"),register)
router.route('/activation').post(activationAccount)
router.route('/login').post(login)
router.route('/me').get(isAuthenticated,getUser)

module.exports = router;