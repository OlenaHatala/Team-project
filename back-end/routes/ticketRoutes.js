const express = require('express')
const router = express.Router()

const {create, read, deleteTicket, update, takeTicket, ticketConfirmation} = require('../controllers/ticketController')
const {ticketlist} = require('../controllers/ticketListController')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route("/ticketlist").get(ticketlist);
router.route("/create").post(create);
router.route("/read").get(read);
router.route("/takeTicket").post(takeTicket);
router.route("/confirmTicket").post(ticketConfirmation);
router.route("/deleteTicket").delete(deleteTicket);
router.route("/update").patch(update);

module.exports = router