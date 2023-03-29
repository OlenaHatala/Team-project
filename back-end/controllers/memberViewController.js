const Board = require("../models/Board");
const Ticket = require("../models/Ticket");

const asyncHandler = require("express-async-handler");

const getBoard = asyncHandler(async (req, res) => {
  const { boardIdSUPER } = req.params;
  const { user_id } = req;
  try {
    const board = await Board.findById(boardId);
    const { label, description, service_name, address } = board;

    var available_tickets = [];
    if (board.members.includes(user_id) || user_id == board.owner_id) {
      for (i = 0; i < 6; i++) {
        const week_tickets = {
          monday: board.tickets[i].monday,
          tuesday: board.tickets[i].tuesday,
          wednesday: board.tickets[i].wednesday,
          thursday: board.tickets[i].thursday,
          friday: board.tickets[i].friday,
          saturday: board.tickets[i].saturday,
          sunday: board.tickets[i].sunday,
        };

        for (const day in week_tickets) {
          let day_tickets = week_tickets[day];

          for (j in day_tickets) {
            const found_ticket = await Ticket.findById(day_tickets[j]).exec();

            if (
              found_ticket.enabled == true &&
              !found_ticket.user_id &&
              found_ticket.is_outdated === false
            ) {
              available_tickets.push(found_ticket);
            }
          }
        }
      }
      return res.status(200).json({
        label,
        description,
        service_name,
        address,
        available_tickets,
      });
    } else {
      res.status(200).json({
        message: "User is not a member",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Board with that id doesn`t exist",
      error: error.message,
    });
  }
});

const joinBoard = asyncHandler(async (req, res) => {
  const { board_id } = req.body;
  const { user_id } = req;
  try {
    const board = await Board.findById(board_id);
    const { label, description } = board;

    if (!board.requests.includes(user_id)) {
      board.requests.push(user_id);
      board.save();
    }

    res.status(200).json({
      message: "User added to requests",
      label,
      description,
    });
  } catch (error) {
    res.status(400).json({
      message: "Board with that id doesn`t exist",
      error: error.message,
    });
  }
});

module.exports = {
  joinBoard,
  getBoard,
};
