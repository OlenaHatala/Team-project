const express = require('express')
const router = express.Router()

const {create, deleteTicket} = require('../controllers/ticketController')

router.route("/create").post(create);
router.route("/deleteTicket").delete(deleteTicket);

module.exports = router