const Ticket = require('../models/Ticket')
//const User = require('../models/User')
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

  const result = await ticket.deleteOne()

  const reply = `Ticket '${result.title}' with ID ${result._id} deleted`

  res.json(reply)
}


module.exports = {
    create,
    //update,
    deleteTicket
}