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
  const created_tables = found_user.created_tables;
  const membered_tables = found_user.membered_tables;
  if (created_tables.length === 0 && membered_tables.length === 0) {
    return res.status(204).json({});
  }

  try {
    let created_tables_arr = [];
    let membered_tables_arr = [];
    for (id in created_tables) {
      const found_board = await Board.findById(created_tables[id]).exec();
      const boardData = getListOwnerData(found_board);
      created_tables_arr.push(boardData);
    }

    for (id in membered_tables) {
      const found_board = await Board.findById(membered_tables[id]).exec();
      const boardData = getListMemberData(found_board);
      membered_tables_arr.push(boardData);
    }
    return res.status(200).json({
      created_tables_arr,
      membered_tables_arr,
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
