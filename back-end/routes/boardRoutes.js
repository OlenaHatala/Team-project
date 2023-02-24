const express = require('express')
const router = express.Router()


const {create, read, deleteBoard, update} = require('../controllers/boardController')

router.route("/create").post(create);
router.route("/read").get(read); 
router.route("/deleteBoard").delete(deleteBoard);
router.route("/update").patch(update);

module.exports = router