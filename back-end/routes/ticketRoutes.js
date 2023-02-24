const express = require('express')
const router = express.Router()

const {create, read, deleteTicket} = require('../controllers/ticketController')

router.route("/create").post(create);
router.route("/read").get(read);
router.route("/deleteTicket").delete(deleteTicket);

module.exports = router