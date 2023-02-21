const express = require('express')
const router = express.Router()

const {create, deleteTicket, update} = require('../controllers/ticketController')

router.route("/create").post(create);
router.route("/deleteTicket").delete(deleteTicket);
router.route("/update").patch(update);

module.exports = router