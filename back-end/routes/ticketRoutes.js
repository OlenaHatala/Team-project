const express = require('express')
const router = express.Router()

const {createNewTicket} = require('../controllers/ticketController')

router.route("/createNewTicket").post(createNewTicket);

module.exports = router