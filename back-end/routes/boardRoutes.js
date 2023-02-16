const express = require('express')
const router = express.Router()


const {create, deleteBoard} = require('../controllers/boardController')

router.route("/create").post(create);
router.route("/deleteBoard").delete(deleteBoard);

module.exports = router