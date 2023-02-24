const express = require('express')
const router = express.Router()


const {create, read, deleteBoard} = require('../controllers/boardController')

router.route("/create").post(create);
router.route("/read").get(read); 
router.route("/deleteBoard").delete(deleteBoard);

module.exports = router