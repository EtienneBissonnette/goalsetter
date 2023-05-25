const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  homeUser,
} = require("../controllers/userController");
const {protect} = require("../middlewares/authMiddleware")


router.route("/").post(createUser);
router.route("/login").post(loginUser);
router.route("/me").get(protect,homeUser);

module.exports = router;
