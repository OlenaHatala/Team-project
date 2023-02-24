const express = require('express')
const router = express.Router()


const {create, deleteBoard, update} = require('../controllers/boardController')

router.route("/create").post(create);
router.route("/deleteBoard").delete(deleteBoard);
router.route("/update").patch(update);

module.exports = router