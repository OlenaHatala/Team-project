
const express = require("express");
const router = express.Router();

const { register, login, update, deleteUser, refresh, logout } = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").patch(update);
router.route("/deleteUser").delete(deleteUser);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

module.exports = router;
