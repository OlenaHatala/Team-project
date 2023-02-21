const Ticket = require('../models/Ticket')
const Board = require('../models/Board')
const asyncHandler = require('express-async-handler')


const create = asyncHandler(async (req, res) => {
    const { table_id, user_id, datetime, duration, is_outdated, enabled, confirmed } = req.body
    console.log(Date.now());
    if (!table_id || !user_id || !datetime || !duration || !is_outdated || !enabled || !confirmed) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    try {
        await Ticket.create({
        table_id,
        user_id, 
        datetime, 
        duration, 
        is_outdated, 
        enabled, 
        confirmed
        }).then((ticket) =>
          res.status(200).json({
            message: "Ticket created successfully",
            ticket,
          })
        )
      } catch (error) {
        res.status(400).json({
          message: "Ticket was not created",
          error: error.message,
        })
      }
})

const deleteTicket = async (req, res) => {
  const { id } = req.body;

  if (!id) {
      return res.status(400).json({ message: 'Ticket ID required' })
  }

  const ticket = await Ticket.findById(id).exec()

  if (!ticket) {
      return res.status(400).json({ message: 'Ticket not found' })
  }

  const board = await Board.findById(ticket.table_id).exec()

  if (!board) {
    return res.status(400).json({ message: 'Board not found' })
  }

  for (i = 0; i<6; i++)
     {  
        const week_tickets = {monday: board.tickets[i].monday, tuesday: board.tickets[i].tuesday,
        wednesday: board.tickets[i].wednesday, thursday : board.tickets[i].thursday, 
        friday: board.tickets[i].friday, saturday: board.tickets[i].saturday, sunday: board.tickets[i].sunday}

        for(var day in week_tickets)
        {
            for (j in week_tickets[day])
            {
                if (week_tickets[day][j] == id) {

                  const index = board.tickets[i][day].indexOf(week_tickets[day][j]);
                  console.log(index)

                  if (index > -1) { 
                    board.tickets[i][day].splice(index, 1); 
                  }

                  board.save((error) => {
                    if (error) {
                      return res
                        .status(200)
                        .json({ message: "An error occurred", error: error.message });
                    }
                });

                  const result = await ticket.deleteOne()

                  const reply = `Ticket '${result.title}' with ID ${result._id} deleted`
                  console.log(board.tickets[i][day])
                  
                  res.status(201).json(reply)
                }                
            }
        }
     }
}

const update = async (req, res) => {
  const {id, ticketData} = req.body;
  const { datetime, duration, is_outdated, enabled, confirmed} = ticketData;

  if (id && (datetime || duration || is_outdated || enabled || confirmed)) {

    try {
    const ticket = await Ticket.findById(id).exec()
      table_id = ticket.table_id
      user_id = ticket.user_id

      ticket.table_id = table_id;
      ticket.user_id = user_id;
      ticket.datetime = datetime ? datetime : ticket.datetime
      ticket.duration = duration ? duration : ticket.duration
      ticket.is_outdated = is_outdated ? is_outdated : ticket.is_outdated
      ticket.enabled = enabled ? enabled : ticket.enabled
      ticket.confirmed = confirmed ? confirmed : ticket.confirmed

        ticket.save((err) => {
          if (err) {
            //console.log("ticket.save")
            return res
              .status(400)
              .json({ message: "An error occurred", error: err.message });
              
          }
          res.status(201).json({ message: "Update successful", ticket });
        });
      }
      catch(error){
        console.log("catch error")
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message });
      };

      /* await Ticket.findById(id)
    .then((ticket) => {
        ticket.table_id = ticket.table_id;
        tisket.user_id = ticket.user_id;
        ticket.datetime = datetime ? datetime : ticket.datetime
        //console.log(datetime)
        ticket.duration = duration ? duration : ticket.duration
        //console.log(duration)
        ticket.is_outdated = is_outdated ? is_outdated : ticket.is_outdated
        //console.log(is_outdated)
        ticket.enabled = enabled ? enabled : ticket.enabled
        //console.log(enabled)
        ticket.confirmed = confirmed ? confirmed : ticket.confirmed
        //console.log(confirmed)

        ticket.save((err) => {
          if (err) {
            console.log("ticket.save")
            return res
              .status(400)
              .json({ message: "An error occurred", error: err.message });
              
          }
          res.status(201).json({ message: "Update successful", ticket });
        });
      })
      .catch((error) => {
        console.log("catch error")
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message });
      }); */

  } else {
    res.status(400).json({ message: "Id is not present" });
  }
};


module.exports = {
    create,
    update,
    deleteTicket
}