const Ticket = require('../models/Ticket')
const Board = require('../models/Board')
const asyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb');


function findFreeSpace(recordedDates, targetDate, targetDateDuration) {
  const targetDataDurationInMs = targetDateDuration * 60000;
  const targetDateStart = targetDate.getTime();
  const targetDateEnd = targetDateStart + targetDataDurationInMs;
  let isAvailable = true;

  for (let i = 0; i < recordedDates.length; i++) {
    const recordedDate = recordedDates[i].datetime.getTime();
    const recordedDurationInMs = recordedDates[i].duration * 60000;
    const recordedDateEnd = recordedDate + recordedDurationInMs;

    // Check if the target event overlaps with the recorded event
    if (
      (recordedDate >= targetDateStart && recordedDate < targetDateEnd) ||
      (recordedDateEnd > targetDateStart && recordedDateEnd <= targetDateEnd) ||
      (recordedDate < targetDateStart && recordedDateEnd > targetDateEnd)
    ) {
      isAvailable = false;
      break;
    }
  }

  return isAvailable;
};

const create = asyncHandler(async (req, res) => {
  const { table_id, user_id, datetime, duration, is_outdated, enabled, confirmed } = req.body;  
  if (!table_id || !user_id || !datetime || !duration || !is_outdated || !enabled || !confirmed) {
      return res.status(400).json({ message: 'All fields are required' })
  }
  const new_table_id = new ObjectId(table_id);
  const new_user_id = new ObjectId(user_id);
  
  // to do add to the board and user  

  try {   
      const existingTicket = await Ticket.findOne({ datetime });
      if (existingTicket) {
        return res.status(400).json({ message: 'A ticket already exists with this datetime' });
      }
      await Ticket.create({
      table_id: new_table_id,
      user_id: new_user_id,         
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
});

const read = asyncHandler(async (req, res) => {
  const { id } = req.body
  try {
    const ticket = await Ticket.findById(id) 
    if(ticket)
    {
      res.status(200).json({
        message:"Get ticket",
        ticket
      })
    }
    else
    {
      return res.status(400).json({ message: 'Ticket not found' })
    }
    res.status(200).json({
    message:"Get ticket",
    ticket
  })
  } catch(error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    })
  } 
});

const update = async (req, res) => {
  const {id, ticketData} = req.body;
  
  const ticket = await Ticket.findById(id).exec()

  if (!ticket) {
      return res.status(400).json({ message: 'Ticket not found' })
  }

  if (!ticketData || !id){
    res.status(404).json({ message: "Data or ID is not present" });
  }

  try{
    const board = await Board.findById(ticket.table_id)
  }catch{
    return res.status(400).json({ message: 'Board not found' })
  }
  let newData = {};

  if(ticketData?.datetime){    
    let currentDate = new Date(); // today
    let diffTime = ticket.datetime.getTime() - currentDate.getTime(); // difference in milliseconds
    let diffDays = diffTime / (1000 * 60 * 60 * 24); // difference in days
    let weekIndex = Math.floor(diffDays / 7); // add 1 to start counting from week 1
    let dayIndex = ticket.datetime.getDay() - 1; // use Math.floor instead of parseInt for consistency
    
    const board = await Board.findById(ticket.table_id)
    if (!board) {
        return res.status(400).json({ message: 'Board not found' })
    }
    
    const week_tickets = [board.tickets[weekIndex].monday, board.tickets[weekIndex].tuesday,
      board.tickets[weekIndex].wednesday, board.tickets[weekIndex].thursday, 
      board.tickets[weekIndex].friday, board.tickets[weekIndex].saturday, board.tickets[weekIndex].sunday];
    

    const day_tickets = week_tickets[dayIndex];
    
    const arrTickets = [];  

    for(i in day_tickets)
    {
      const findId = await Ticket.findById(day_tickets[i]);
      if(findId)
      {
        arrTickets.push(findId);
      }
    } 

    const sortTickets = (tickets) => {
      tickets.sort((a, b) => {
        if (a.datetime < b.datetime) { return -1; }
        if (a.datetime > b.datetime) { return 1; }
        return 0;
      });
      return tickets;
    }

    sortTickets(arrTickets);

    const newTicketDate = new Date(new Date(ticketData.datetime).toISOString());

    if(findFreeSpace(arrTickets, newTicketDate, ticketData.duration) != true)
    {
      res.status(400).json({ message: 'Ticket already exists at this time' });
    }
    else
    {
      newData.datetime = newTicketDate;
    }
  }
  
  if(ticketData?.duration){
    newData.duration = ticketData.duration
  }
  if(ticketData?.is_outdated){
    newData.is_outdated = ticketData.is_outdated
  }
  if(ticketData?.enabled){
    newData.enabled = ticketData.enabled
  }
  if(ticketData?.confirmed){
    newData.confirmed = ticketData.confirmed
  }

  if (Object.keys(newData).length) {

    try {
      await Ticket.findByIdAndUpdate(
        id, newData
      );
      
      const ticket = await Ticket.findById(id)
      const board = await Board.findById(ticket.table_id)
      
      if (ticket.user_id)
      {
        board.members.push([ticket.user_id, ticket.confirmed])
      }

      board.save()
  
      res.status(201).json({ message: "Update successful", ticket });
      }
      catch(error){
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message });
      };
  }  
  else if (id && ticketData && !(Object.keys(newData).length)) {
    res.status(204).json({ message: "Data is not present" });
  }
};

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

  for (i = 0; i < 6; i++)
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
                  
                  res.status(201).json(reply)
                }                
            }
        }
     }
};

module.exports = {
    create,
    read, 
    update,
    deleteTicket
}