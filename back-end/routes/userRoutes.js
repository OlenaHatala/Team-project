const express = require("express");
const router = express.Router();

const { update, deleteUser, read} = require("../controllers/userController");

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route("/update").patch(update);
router.route("/deleteUser").delete(deleteUser);
router.route("/read").get(read);

module.exports = router;
