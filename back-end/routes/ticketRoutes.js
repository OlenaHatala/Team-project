<<<<<<< HEAD
=======
const express = require('express')
const router = express.Router()

const {create} = require('../controllers/ticketController')

router.route("/create").post(create);

module.exports = router
>>>>>>> ec71799 (task completed)
