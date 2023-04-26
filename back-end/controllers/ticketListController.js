const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Board = require('../models/Board')
const { ObjectId } = require('mongodb');
const asyncHandler = require("express-async-handler");
const { check_if_outdated } = require("./ticketController");

const getListTiketData = async (ticket, user_id) => {
  const board = await Board.findById(ticket?.table_id).exec();
    const ticketData = {
        _id: ticket?._id,
        datetime: ticket?.datetime,
        duration: ticket?.duration,
        is_outdated: ticket?.is_outdated,
        is_confirmed: ticket?.confirmed,
        boardlabel: board?.label || "",
        boardId: board?._id,
        is_rejected: ticket.user_id != user_id,
    }
    return ticketData;
}

const ticketlist = asyncHandler(async (req, res) => {
  const { user_id } = req;
  const found_user = await User.findById(user_id);
  if(!found_user)
  {
    return res.status(400).json({ message: 'User not found' })
  }
  const taken_tickets = found_user.taken_tickets;
  if (taken_tickets.length === 0) {
    return res.status(204).json({});
  }

  try {
    let taken_tickets_arr = [];
    for (id in taken_tickets) {
      const found_ticket = await check_if_outdated(taken_tickets[id]);
      const ticketData = await getListTiketData(found_ticket, user_id);
      taken_tickets_arr.push(ticketData);
    }
    return res.status(200).json({
        taken_tickets_arr
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred",
      error: error?.message || "Unknown error",
    });
  }
});

module.exports = {
    ticketlist,
};