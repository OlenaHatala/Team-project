const express = require("express");
const router = express.Router();

const { register, login, logout, refresh} = require("../controllers/authController");


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/refresh").get(refresh);

module.exports = router;
