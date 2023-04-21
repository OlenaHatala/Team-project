const Board = require("../models/Board");
const User = require("../models/User");

const asyncHandler = require("express-async-handler");

const getOwnerBoard = asyncHandler(async (req, res) => {
  const { boardId } = req.params;
  const { user_id } = req;
  try {
    const board = await Board.findById(boardId);
    const { label, description, service_name, address, _id, req_confirm,
    book_num, auto_open, owner_id, requests, members, markup} = board;
    if (owner_id.toString() !== user_id) {
        return res.status(403).json({
            message: "Forbidden",
          });
    }
    const membersArray = await Promise.all(members.map(async (member_id) => {
        const found_member = await User.findById(member_id);
        return {
            name: found_member.name,
            surname: found_member.surname,
            mobile_number: found_member.mobile_number
        }
    }));
    const requestArray = await Promise.all(requests.map(async (req_id) => {
        const found_requsted_user = await User.findById(req_id);
        return {
            name: found_requsted_user.name,
            surname: found_requsted_user.surname,
            mobile_number: found_requsted_user.mobile_number
        }
    }));
    return res.status(200).json({
        _id,
        owner_id,
        label,
        description,
        service_name,
        book_num,
        auto_open,
        req_confirm,
        markup,
        members: membersArray,
        requests: requestArray,
        address,
      });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured",
      error: error.message,
    });
  }
});

module.exports = {
    getOwnerBoard,
};
