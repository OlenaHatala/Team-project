const express = require('express')
const router = express.Router()


const {create, read, deleteBoard, readOneWeek, update} = require('../controllers/boardController')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route("/create").post(create);
router.route("/read").get(read); 
router.route("/readOneWeek").get(readOneWeek);
router.route("/deleteBoard").delete(deleteBoard);
router.route("/update").patch(update);

module.exports = router