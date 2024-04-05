const express = require('express');
const { upload } = require('../utils/multer');
const { register, activationAccount } = require('../controllers/userCtrl');
const router = express.Router();

router.route('/register').post(upload.single("file"),register)
router.route('/activation').post(activationAccount)

module.exports = router;