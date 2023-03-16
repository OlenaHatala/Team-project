const Ticket = require('../models/Ticket')
const Board = require('../models/Board')
const asyncHandler = require('express-async-handler')

function endTicket(ticket)
{

  console.log("---------end ticket function---------")

  start = ticket.datetime
  duration = ticket.duration
  end = start.setMinutes(start.getMinutes() + duration)
  return end;
};

function betweenTickets(ticketBefore, ticketAfter, addTicket)
{
  console.log("---------between tickets function---------")

  return  addTicket.start >= endTicket(ticketBefore) && endTicket(addTicket) <= ticketAfter.start
};

const create = asyncHandler(async (req, res) => {
    const { table_id, user_id, datetime, duration, is_outdated, enabled, confirmed } = req.body
    if (!table_id || !user_id || !datetime || !duration || !is_outdated || !enabled || !confirmed) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    // to do add to the board and user

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
    //console.log(board)
  }catch{
    return res.status(400).json({ message: 'Board not found' })
  }
  let newData = {};

  

  if(ticketData?.datetime){    
    //newData.datetime = ticketData.datetime
    let currentDate = new Date();
    let diffDate = (ticket.datetime - currentDate) / (1000 * 60 * 60 * 24)
    weekIndex = Math.floor(diffDate/6); 
    dayIndex = parseInt(diffDate % 7);
    console.log(ticket.datetime - currentDate);
    console.log(diffDate);
    console.log(weekIndex);
    console.log(dayIndex);

    const board = await Board.findById(ticket.table_id)
    //console.log(board)
    if (!board) {
        return res.status(400).json({ message: 'Board not found' })
    }

    
    const week_tickets = [board.tickets[weekIndex].monday, board.tickets[weekIndex].tuesday,
      board.tickets[weekIndex].wednesday, board.tickets[weekIndex].thursday, 
      board.tickets[weekIndex].friday, board.tickets[weekIndex].saturday, board.tickets[weekIndex].sunday];
      //console.log(week_tickets)
    

    const tickets_id = week_tickets[dayIndex];
    //console.log(week_tickets);

    const arrTickets = [];  

    //console.log(ticket)  
    for(i in tickets_id)
    {
      //console.log(i);
      const findId = await Ticket.findById(tickets_id[i]);
      //console.log(findId);
      if(findId)
      {
        arrTickets.push(findId);
      }
    } 
    //console.log(arrTickets);

    ticketBefore = null;
    ticketAfter =  null;
    prevTicket = null;


    const timeString = (date) => {
      let minutes = date.getMinutes();
      let hours = date.getHours();
    
      let minutesStr = "";
      let hoursStr = "";
    
      if (minutes < 10) {
        minutesStr = "0" + minutes.toString();
      } else {
        minutesStr = minutes.toString();
      }
    
      if (hours < 10) {
        hoursStr = "0" + hours.toString();
      } else {
        hoursStr = hours.toString();
      }
    
      return hoursStr + minutesStr;
    }


    const sortTickets = (tickets) => {
      tickets.sort(function (a, b) {
        if(timeString(a.datetime) < timeString(b.datetime)) { return -1; }
        if(timeString(a.datetime) > timeString(b.datetime)) { return 1; }
        return 0;
      });
      return tickets
    }

    console.log(sortTickets(arrTickets));

    for(i in arrTickets)
    {
      //console.log(i);

      if(arrTickets[i].id === id)
      {
        console.log("---------equals id---------")
        console.log(arrTickets[i].id)
        console.log(id)
        continue;
      }
      if(arrTickets[i].datetime === ticket.datetime)
      {
        console.log("---------equals datetimes---------")
        console.log(arrTickets[i].datetime)
        console.log(ticket.datetime)
        return res.status(400).json({ message: 'Ticket already exists at this time' });
      }
      else if(arrTickets[i].datetime < ticket.datetime)
      {
        console.log("---------less datetimes---------")
        console.log(arrTickets[i].datetime)
        console.log(ticket.datetime)
        continue;
      }
      else if(arrTickets[i].datetime > ticket.datetime)
      {
        console.log("---------more datetimes---------")
        console.log(arrTickets[i].datetime)
        console.log(ticket.datetime)
        ticketBefore = prevTicket;
        ticketAfter = arrTickets[i];
        break;
      }
      prevTicket = arrTickets[i];
    }
    if(!(betweenTickets(ticketBefore, ticketAfter, ticket)))
    {
      console.log("---------last if---------")

      return res.status(400).json({ message: 'Ticket already exists at this time' });
    }
  }
  console.log("hello")
  
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
      console.log(ticket)
      // const board = await Board.findById(ticket.table_id)
      // console.log(board)

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
}

module.exports = {
    create,
    read, 
    update,
    deleteTicket
}