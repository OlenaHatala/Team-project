const express = require('express')
const router = express.Router()


<<<<<<< HEAD
const {create, deleteBoard, update} = require('../controllers/boardController')

router.route("/create").post(create);
router.route("/deleteBoard").delete(deleteBoard);
router.route("/update").patch(update);
=======
const {create} = require('../controllers/boardController')

router.route("/create").post(create);
>>>>>>> 1a51b33 (implement the creation of a board)

module.exports = router