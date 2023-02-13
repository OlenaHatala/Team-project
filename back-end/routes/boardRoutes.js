const express = require('express')
const router = express.Router()


const {create} = require('../controllers/boardController')

router.route("/create").post(create);

module.exports = router