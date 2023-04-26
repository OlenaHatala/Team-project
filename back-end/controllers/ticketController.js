const Ticket = require('../models/Ticket')
const Board = require('../models/Board')
const asyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb');
const User = require('../models/User');
const Mongoose = require("mongoose")


const week_day = {
  0: 'monday',
  1: 'tuesday',
  2: 'wednesday',
  3: 'thursday',
  4: 'friday',
  5: 'saturday',
  6: 'sunday',
}


async function check_if_outdated(id){
  try {
    const ticket = await Ticket.findById(id).exec()
    if(!ticket){
      console.log("Ticket not found");
    }

    let currentDate = new Date(); // today
    const timezoneOffset = 0
    //const timezoneOffset = currentDate.getTimezoneOffset(); // Get the difference in minutes between the local time zone and UTC time
    var new_current_time = new Date(currentDate.getTime() - (timezoneOffset * 60 * 1000)); // Adjust the time by the offset
    let diffTime = ticket.datetime.getTime() - new_current_time.getTime();
    if(diffTime < 0)
    {
      await Ticket.findByIdAndUpdate(
        ticket._id, {is_outdated: true}
      );
      ticket.is_outdated = true
    }
    return ticket
  }
  catch (error) {
      console.log("error")
      return null;
  }
}

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
  if (!table_id || !datetime || !duration || !is_outdated || !enabled || !confirmed) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  

  const new_table_id = new ObjectId(table_id);
  const new_user_id = user_id === "" ? null : new ObjectId(user_id); // convert empty string to null

  try { 
    const newTicketDate = new Date(new Date(datetime).toISOString());  
    let currentDate = new Date(); // today
    
    if (datetime < currentDate)
    {
      return res.status(400).json({ message: 'You can not create ticket in the past time' });
    }

    let diffTime = newTicketDate.getTime() - currentDate.getTime(); // difference in milliseconds
    let diffDays = diffTime / (1000 * 60 * 60 * 24); // difference in days
    let weekIndex = Math.floor(diffDays / 7); // add 1 to start counting from week 1
    let dayIndex = newTicketDate.getDay() - 1; // use Math.floor instead of parseInt for consistency
    
    const board = await Board.findById(table_id)
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

    if(findFreeSpace(arrTickets, newTicketDate, duration) != true)
    {
      return res.status(400).json({ message: 'Ticket already exists at this time' });
    }

    const existingTicket = await Ticket.findOne({
      datetime: newTicketDate,
      duration,
      table_id: new_table_id
    });
    
    if (existingTicket) {
      return res.status(400).json({ message: 'Ticket already exists at this time' });
    } 

    const ticket = await Ticket.create({
      table_id: new_table_id,
      user_id: new_user_id, 
      datetime, 
      duration, 
      is_outdated, 
      enabled, 
      confirmed
    });
    board.tickets[weekIndex][week_day[dayIndex]].push(ticket._id)
    board.save((error) => {
      if (error) {
          return res
          .status(201)
          .json({ message: "An error occurred", error: error.message });
      }
  });

    return res.status(200).json({
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    res.status(400).json({
      message: "Ticket was not created",
      error: error.message,
    });
  }
});

const read = asyncHandler(async (req, res) => {
  const { id } = req.body
  try {
    const ticket = await check_if_outdated(id) 
    if(!ticket)
    {
      return res.status(400).json({
        message:"Ticket not found",
      })
    }
    else
    {
      return res.status(200).json({ message: 'Ticket found' ,
      ticket
      })
    }

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
    return res.status(404).json({ message: "Data or ID is not present" });
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
      const findId = await check_if_outdated(day_tickets[i]);
      if(findId && findId._id != id)
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
      return res.status(400).json({ message: 'Ticket already exists at this time' });
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

      return res.status(201).json({ message: "Update successful", ticket });
      }
      catch(error){
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message });
      };
  }  
  else if (id && ticketData && !(Object.keys(newData).length)) {
    return res.status(204).json({ message: "Data is not present" });
  }
};

const takeTicket = asyncHandler(async (req, res) => {
  const { user_id} = req
  const {ticket_id} = req.body

  try {
    const ticket = await check_if_outdated(ticket_id) 
    if(!ticket)
    { return res.status(200).json({
        message:"Ticket not found",
      })}

    const board = await Board.findById(ticket.table_id);
    if(!board)
    { return res.status(200).json({
        message:"Table not found",
      })
    }

    const user = await User.findById(user_id) 
    if(!board)
    { return res.status(200).json({
        message:"User not found",
      })
    }
    const ticket_obj_id = new ObjectId(ticket_id)
    const table_obj_id = new ObjectId(board._id)

    if(!ticket.enabled){
      return res.status(200).json({
        message:"Ticket is not enabled",
      })
    }
    if(ticket.user_id){
      return res.status(200).json({
        message:"Ticket is already taken",
      })
    }
    if(ticket.is_outdated){
      return res.status(200).json({
        message:"Ticket is outdated",
      })
    }
    let num_of_booked = 0
    const taken_tickets = user.taken_tickets
    for(tick in taken_tickets)
    {
      const found_ticket = await Ticket.findById(taken_tickets[tick]) 
      if(found_ticket?.table_id?.toString() == board._id.toString())
      {
        num_of_booked++;
      }
    } 
    if(num_of_booked >= board.book_num){
      return res.status(200).json({
        message:"You cannot take another ticket. The owner of the board has set a limit on the number of taken tickets."
      })
    }

    if(board.members.includes(user_id))
    {
      await Ticket.findByIdAndUpdate(
        ticket_obj_id, {user_id: user._id}
      );

      if( !board.req_confirm ){
        await Ticket.findByIdAndUpdate(
          ticket_obj_id, {confirmed: true}
        );
      }
      else {
        var uncnf_tickets = board.unconfirmed_tickets;
        uncnf_tickets.push(ticket._id)
        await Board.findByIdAndUpdate(
          table_obj_id, {unconfirmed_tickets: uncnf_tickets}
        );
      }

      var tak_tickets = user.taken_tickets;
      if(!tak_tickets.includes(ticket_obj_id.toString())){
      
        tak_tickets.push(ticket_obj_id);
        
        await User.findByIdAndUpdate(
          user_id, {taken_tickets: tak_tickets}
        );
      }


      return res.status(201).json({ message: "Success" });
    }

    else {
      { return res.status(400).json({ message: 'You are not a member of the table' }) }
    }
    
  } catch(error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    })
  } 
});

const ticketConfirmation = asyncHandler(async (req, res) => {
  const {ticket_id, is_approved } = req.body;
  const {user_id} = req;

  const required_fields_present = (ticket_id && is_approved)

  if ( !required_fields_present){
      return res.status(400).json({ 
          message: "Not all required fields are present",
        })
  }

  try {
    const ticket = await check_if_outdated(ticket_id);
    
    if(!ticket){
        return res.status(404).json({
            message: "Ticket with that id doesn`t exist",
        })
    }
    const board = await Board.findById(ticket.table_id);
    if(!board){
      return res.status(404).json({
          message: "Board with that id doesn`t exist",
      })
    }
    const owner = await User.findById(user_id);


    if(!owner){
        return res.status(404).json({
            message: "Owner with that id doesn`t exist",
        })
    }

    const user = await User.findById(ticket.user_id);
    if(!user){
        return res.status(404).json({
            message: "User with that id doesn`t exist",
        })
    }

    if(owner.id != board.owner_id){
      return res.status(404).json({
        message: "You are not the owner of this board",
      })
    }

    if(is_approved === "true"){
      await Ticket.findByIdAndUpdate(
        ticket_id, {confirmed: true}
      );
    }
    else if (is_approved === "false"){
      await Ticket.findByIdAndUpdate(
        ticket_id, {confirmed: false, user_id: null}
      );
      // await User.findByIdAndUpdate(
      //   user._id, {taken_tickets: user.taken_tickets.filter((requested_id)=>{ 
      //     return requested_id != ticket_id;
      //   })}
      // );
      

    }
    else {
      return res.status(404).json({
        message:"Is approved has a bad value",
      }) 
    }
    await Board.findByIdAndUpdate(
      ticket.table_id, {unconfirmed_tickets: board.unconfirmed_tickets.filter((requested_id)=>{ 
        return requested_id != ticket_id;
      })}
    );


    return res.status(200).json({
        message:"All is well",
    }) 
  }
  catch (error) {
      return res.status(500).json({
          error: error.message,
      })
  }
})

const deleteTicket = async (req, res) => {
  const { id } = req.body;
  const {created_tables} = req;

 

  if (!id) {
      return res.status(400).json({ message: 'Ticket ID required' })
  }

  const ticket = await Ticket.findById(id).exec()

  if (!ticket) {
      return res.status(400).json({ message: 'Ticket not found' })
  }

  if(!created_tables.includes(ticket.table_id.toString())){
     return res.status(403).json({ message: "Forbiden" })
  }

  const board = await Board.findById(ticket.table_id).exec()

  if (!board) {
    return res.status(400).json({ message: 'Board not found' })
  }

  const members = board.members

  for(var member_id in members){
    const member = await User.findById(members[member_id]);

      await User.findByIdAndUpdate(
      member._id, {taken_tickets: member.taken_tickets.filter((requested_id)=>{ 
        return requested_id != ticket.id;
      })}
    );
  }

  if(ticket.user_id){

    const user = await User.findById(ticket.user_id).exec();

    let tak_tickets = user.taken_tickets.filter(requested_id => {
        return requested_id.toString() !== ticket._id.toString() 
    })

    
    await User.findByIdAndUpdate(
      ticket.user_id, {taken_tickets : tak_tickets}
      );

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

                  const reply = `Ticket with ID ${result._id} deleted`
                  
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
    takeTicket,
    ticketConfirmation,
    deleteTicket,
    check_if_outdated
}
