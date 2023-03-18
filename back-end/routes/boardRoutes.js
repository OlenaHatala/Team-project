const express = require('express')
const router = express.Router()


const {create, read, deleteBoard, readOneWeek, update, getBoard, addMember} = require('../controllers/boardController')
const { boardlist } = require('../controllers/boardListController');

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route("/boardlist").get(boardlist);
router.route("/create").post(create);
router.route("/read").get(read); 
router.route("/readOneWeek").get(readOneWeek);
router.route("/deleteBoard").delete(deleteBoard);
router.route("/update").patch(update);
router.route("/getBoard").post(getBoard); 
router.route("/addMember").patch(addMember)

module.exports = router