const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");

router.post("/", createUser);
// router.post("/login", loginUser)
// router.get("users/me")

module.exports = router;
