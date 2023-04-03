const express = require('express')
const router = express.Router()


const {create, read, deleteBoard, readOneWeek, update, addMember, createWeek} = require('../controllers/boardController')
const {getBoard, joinBoard} = require('../controllers/memberViewController')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route("/create").post(create);
router.route("/createWeek").post(createWeek);
router.route("/read").get(read); 
router.route("/readOneWeek").get(readOneWeek);
router.route("/deleteBoard").delete(deleteBoard);
router.route("/update").patch(update);
router.route("/getBoard/:boardIdSUPER").get(getBoard); 
router.route("/addMember").patch(addMember);
router.route("/join").post(joinBoard); 

module.exports = router