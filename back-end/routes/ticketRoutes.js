const express = require('express')
const router = express.Router()

const {create, read, deleteTicket, update} = require('../controllers/ticketController')

router.route("/create").post(create);
router.route("/read").get(read);
router.route("/deleteTicket").delete(deleteTicket);
router.route("/update").patch(update);

module.exports = router