const express = require("express");
const router = express.Router();

const { register, login, update, deleteUser, logout, refresh, read} = require("../controllers/authController");



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").patch(update);
router.route("/deleteUser").delete(deleteUser);
router.route("/logout").post(logout);
router.route("/refresh").get(refresh);
router.route("/read").get(read);

module.exports = router;
