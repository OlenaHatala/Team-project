const express = require('express')
const router = express.Router()


const {create, read, deleteBoard, readOneWeek, update, addMember} = require('../controllers/boardController')
const {getBoard, joinBoard} = require('../controllers/memberViewController')
const { boardlist } = require('../controllers/boardListController');

const verifyJWT = require('../middleware/verifyJWT')
const { getOwnerBoard } = require('../controllers/ownerViewController')

router.use(verifyJWT)

router.route("/boardlist").get(boardlist);
router.route("/create").post(create);
router.route("/read").get(read); 
router.route("/readOneWeek/:id/:numberOfWeek").get(readOneWeek);
router.route("/deleteBoard").delete(deleteBoard);
router.route("/update").patch(update);
router.route("/getBoard/:boardId").get(getBoard); 
router.route("/getOwnerBoard/:boardId").get(getOwnerBoard);
router.route("/addMember").patch(addMember)
router.route("/join").post(joinBoard); 

module.exports = router