const express = require("express");
const {
  register,
  activationAccount,
  login,
  getUser,
  logoutUser,
  getAllUsers,
  getMyPosts,
  getSingleUser,
  followOrUnfollowUser,
} = require("../controllers/userCtrl");
const { isAuthenticated } = require("../middlewares/auth");
const uploadMiddleWare = require("../utils/multer");
const router = express.Router();

router.route("/register").post(uploadMiddleWare.single("file"), register);
router.route("/activation").post(activationAccount);
router.route("/login").post(login);
router.route("/me").get(isAuthenticated, getUser);
router.route("/logout").get(isAuthenticated, logoutUser);
router.route("/users").get(getAllUsers);
router.route("/posts").get(isAuthenticated, getMyPosts);
router.route("/:id").get(isAuthenticated, getSingleUser);
router.route("/:id/follow").get(isAuthenticated, followOrUnfollowUser);

module.exports = router;
