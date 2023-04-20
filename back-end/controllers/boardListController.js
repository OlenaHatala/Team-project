const User = require("../models/User");
const Board = require("../models/Board");
const asyncHandler = require("express-async-handler");
const {
  getListMemberData,
  getListOwnerData,
} = require("../utils/board/boardList");

const boardlist = asyncHandler(async (req, res) => {
  const { user_id } = req;
  const found_user = await User.findById(user_id).exec();
  const created_boards = found_user.created_tables;
  const membered_boards = found_user.membered_tables;
  if (created_boards.length === 0 && membered_boards.length === 0) {
    return res.status(204).json({});
  }

  try {
    let created_boards_arr = [];
    let membered_boards_arr = [];
    for (id in created_boards) {
      const found_board = await Board.findById(created_boards[id]).exec();
      const boardData = getListOwnerData(found_board);
      created_boards_arr.push(boardData);
    }

    for (id in membered_boards) {
      const found_board = await Board.findById(membered_boards[id]).exec();
      const boardData = getListMemberData(found_board);
      membered_boards_arr.push(boardData);
    }
    return res.status(200).json({
      created_boards_arr,
      membered_boards_arr,
    });
  } catch (error) {
    return res.status(400).json({
      message: "And error occurred",
      error: error?.message || "Unknown error",
    });
  }
});

module.exports = {
  boardlist,
};
