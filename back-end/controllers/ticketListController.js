const User = require("../models/User");
const Ticket = require("../models/Ticket");
const asyncHandler = require("express-async-handler");

const getListTiketData = (ticket) => {
    const ticketData = {
        _id: ticket._id,
        datetime: ticket.datetime,
        duration: ticket.duration
    }
    return ticketData;
}

const ticketlist = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
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
      const found_ticket = await Ticket.findById(taken_tickets[id]).exec();
      const ticketData = getListTiketData(found_ticket);
      taken_tickets_arr.push(ticketData);
    }
    return res.status(200).json({
        taken_tickets_arr
    });
  } catch (error) {
    return res.status(400).json({
      message: "And error occurred",
      error: error?.message || "Unknown error",
    });
  }
});

module.exports = {
    ticketlist,
};