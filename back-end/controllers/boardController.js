const cron = require('node-cron');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Board = require('../models/Board')
const User = require('../models/User')
const Ticket = require('../models/Ticket')

const asyncHandler = require('express-async-handler')

const week_index = {
    'monday': 0,
    'tuesday': 1,
    'wednesday': 2,
    'thursday': 3,
    'friday': 4,
    'saturday': 5,
    'sunday': 6,
}

const ticketsDay = {
    'sun': 0,
    'mon': 1,
    'tue': 2,
    'wed': 3,
    'thu': 4,
    'fri': 5,
    'sat': 6
}

cron.schedule('05 00 * * *', async () => {
    const today = new Date()
    const dayOfWeek = today.getDay();
    
    try {
        const boards = await Board.find().exec();

        for (const j in boards)
        {
            const board = await Board.findById(boards[j].id)

            if (board.auto_open.day == "none")
            {
                //console.log('autoopening is disabled')
                continue
            }

            else if (board.auto_open.day == "every")
            {
                changed = false
                for (i = 0; i < 6; i++) 
                {
                    const week_tickets = {monday: board.tickets[i].monday, tuesday: board.tickets[i].tuesday,
                    wednesday: board.tickets[i].wednesday, thursday : board.tickets[i].thursday, 
                    friday: board.tickets[i].friday, saturday: board.tickets[i].saturday, sunday: board.tickets[i].sunday}
                    for (const day in week_tickets)
                    {
                        let day_tickets = week_tickets[day]
                        
                        for (let t in day_tickets)
                        {
                            const found_ticket = await Ticket.findById(day_tickets[t]).exec()
                            if (found_ticket.enabled == true) { break }
                            else
                            {
                                await Ticket.findByIdAndUpdate(
                                    day_tickets[t], {enabled: true}
                                );
                                changed = true
                            }
                        }
                        if(changed) { break; }
                    }
                    if(changed) { break; }
                }
            }
            else
            {
                if (ticketsDay[board.auto_open.day] === today.getDay())
                {
                    const week_tickets = {monday: board.tickets[board.auto_open.ahead - 1].monday, tuesday: board.tickets[board.auto_open.ahead - 1].tuesday,
                                        wednesday: board.tickets[board.auto_open.ahead - 1].wednesday, thursday : board.tickets[board.auto_open.ahead - 1].thursday, 
                                        friday: board.tickets[board.auto_open.ahead - 1].friday, saturday: board.tickets[board.auto_open.ahead - 1].saturday, sunday: board.tickets[board.auto_open.ahead - 1].sunday}

                    for(const i in week_tickets) 
                    {
                        let day_tickets = week_tickets[i]
                        for(const ticket_id in day_tickets)
                        {
                            await Ticket.findByIdAndUpdate(
                                day_tickets[ticket_id], {enabled: true}
                                );
                        }
                    }
                }
            }
        }
    }
    catch (error){
        return res.status(400).json({
            message: "Something went wrong",
            error: error.message,
        })
    }
})


const getBoardTicketOwner = async (ticket) => {
    let user = null;
    if (ticket.user_id) {
        const found_user = await User.findById(ticket.user_id);
        user = {
            name: found_user.name,
            surname: found_user.surname,
            mobile_number: found_user.mobile_number
        };
    }
    return {
        user,
        _id: ticket._id,
        table_id: ticket.table_id,
        datetime: ticket.datetime,
        is_outdated: ticket.is_outdated,
        confirmed: ticket.confirmed,
        enabled: ticket.enabled,
        duration: ticket.duration,
    };
} 

const getBoardTicketMember = (ticket) => {
    return {
        _id: ticket._id,
        table_id: ticket.table_id,
        datetime: ticket.datetime,
        is_outdated: ticket.is_outdated,
        confirmed: ticket.confirmed,
        duration: ticket.duration,
    };
} 

const compareMarkup = (a, b) => {

    if (a.duration !== b.duration) {
        return false
    }

    for (const day in a.days) {
        if ((a.days[day].open !== b.days[day].open) || 
        (a.days[day].close !== b.days[day].close) || 
        !(Arrays.equals(a.days[day].hours, b.days[day].hours))) {
            return false   
        }
    }
    return true
}

function addMinutes(date, minutes) {
    if (!(date instanceof Date)) {
        throw new Error('Invalid date object');
      }
    return new Date(date.getTime() + minutes * 60000);
  }
  
const create  = asyncHandler(async (req, res) =>{
    const { address, description, label,service_name, req_confirm, book_num, markup, auto_open} = req.body
    const { user_id: owner_id } = req;

    const required_fields_present = (label && service_name && book_num && markup && auto_open)
    if ( !required_fields_present){
        return res.status(400).json({ 
            message: "Not all required fields are present",
          })
        }

    
    const tickets = 
    [{
        monday:  [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    },
    {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    },
    {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    },
    {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    },
    {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    },
    {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    }]


    try {
        const board = await Board.create({
            owner_id,
            label,
            description: description ? description: "",
            service_name,
            req_confirm,
            book_num,
            markup,
            tickets,
            address: address ? address: "",
            auto_open
        })

        var count_tickets = 0

        for (i = 0; i<6; i++)
        {
            for (const day in markup.days) 
            {
                const open_hour = markup.days[day].open.split(':')[0];
                const open_min = markup.days[day].open.split(':')[1];

                const close_hour = markup.days[day].close.split(':')[0];
                const close_min = markup.days[day].close.split(':')[1];

                const duration = markup.duration

                const current_day = new Date().getDay()
                num_of_days = 8 - current_day + 7 * i + week_index[day]

                const open_time = new Date(new Date().getTime() + num_of_days*24*60*60*1000);
                open_time.setMinutes(open_min)
                open_time.setHours(open_hour )

                const timezoneOffset = open_time.getTimezoneOffset(); // Get the difference in minutes between the local time zone and UTC time
                var new_open_time = new Date(open_time.getTime() - (timezoneOffset * 60 * 1000)); // Adjust the time by the offset
                var ticket_time = new Date(open_time.getTime() - (timezoneOffset * 60 * 1000)); // Adjust the time by the offset


                const close_time = new Date(new Date().getTime() + num_of_days*24*60*60*1000);
                close_time.setHours(close_hour)
                close_time.setMinutes(close_min)

                const new_close_time = new Date(close_time.getTime() - (timezoneOffset * 60 * 1000)); // Adjust the time by the offset

                while(addMinutes(ticket_time, duration) <= new_close_time)
                {
                    ticket = await Ticket.create({table_id:board._id, user_id: null , datetime: ticket_time, duration: markup.duration,is_outdated: false, enabled: false, confirmed: false})

                    if (board.auto_open.day == "every")
                    {
                        if (count_tickets < board.auto_open.ahead)
                        {
                            ticket.enabled = true
                            
                            count_tickets++
                        }
                    }
                    else if (board.auto_open.day != "none")
                    {
                        if (i < board.auto_open.ahead)
                        {
                            ticket.enabled = true
                        }
                    }

                    ticket.save()
                    board.tickets[i][day].push(ticket._id)

                    ticket_time = addMinutes(ticket_time, duration)
                } 
            }
        }
        board.save((error) => {
            if (error) {
                return res
                .status(201)
                .json({ message: "An error occurred", error: error.message });
            }
        });
        const owner = await User.findById(owner_id).exec();
        owner.created_tables.push(board._id);
        await owner.save();

        return res.status(200).json({ message: "Created successfully", board});
    }
    catch (error) {
        return res.status(400).json({
            message: "Board was not created",
            error: error.message,
        })
    }
})

async function delete_outdated_week(id){
    try {
        const board = await Board.findById(id).exec()
        
        for (i = 0; i<6; i++){
            
            const week_tickets = {monday: board.tickets[i].monday, tuesday: board.tickets[i].tuesday,
                wednesday: board.tickets[i].wednesday, thursday : board.tickets[i].thursday, 
                friday: board.tickets[i].friday, saturday: board.tickets[i].saturday, sunday: board.tickets[i].sunday}

            
            if(i == 0){
                
                for(var day in week_tickets){
                    for (j in week_tickets[day])
                    {
                        const found_ticket = await Ticket.findById(week_tickets[day][j]).exec()
        
                        if (!found_ticket) {
                            continue
                        }
                        if(found_ticket.user_id){

                            const user = await User.findById(found_ticket.user_id).exec();

                            let tak_tickets = user.taken_tickets.filter(requested_id => {
                                return requested_id.toString() !== found_ticket._id.toString() 
                            })

                            
                            await User.findByIdAndUpdate(
                                found_ticket.user_id, {taken_tickets : tak_tickets}
                              );
     
                        }
                        const result_ticket = await found_ticket.deleteOne()
                    }
                }
                board.tickets[i] = week_tickets
            }
            if(i == 5){
                board.tickets[i] = {
                    monday:  [],
                    tuesday: [],
                    wednesday: [],
                    thursday: [],
                    friday: [],
                    saturday: [],
                    sunday: []
                }
            }
            else{
                board.tickets[i] = board.tickets[i+1]
            }
        }
        board.save();
        
    }
    catch (error) {
        console.log("error")
    }
}

cron.schedule('32 00 * * 4', async () => {
    try {
        const boards = await Board.find().exec();
        
        for (const board of boards) {
            await delete_outdated_week(board._id);
        }

        console.log('Week deleted successfully for all boards');
    }
    catch (error) {
        console.error('An error occurred while deleting weeks for all boards:', error.message);
    }
});
const createWeek  = asyncHandler(async (req, res) =>{
    const { board_id, week_id} = req.body
    const { user_id } = req;

    const required_fields_present = (board_id && week_id && user_id )
    if ( !required_fields_present){
        return res.status(400).json({ 
            message: "Not all required fields are present",
          })
        }

    try {
        const board = await Board.findById(board_id);
        const weekObjectId = mongoose.Types.ObjectId(week_id);
        if(board.owner_id != user_id)
        {
            return res.status(400).json({ 
                message: "User does not own that board",
              })
        }
        let found_week = false
        for (i = 0; i<6; i++)
        {
            if(board.tickets[i]._id.equals(weekObjectId))
            {
                found_week = true
                
                const week_tickets = {monday: board.tickets[i].monday, tuesday: board.tickets[i].tuesday,
                    wednesday: board.tickets[i].wednesday, thursday : board.tickets[i].thursday, 
                    friday: board.tickets[i].friday, saturday: board.tickets[i].saturday, sunday: board.tickets[i].sunday}

                

                for (const day in week_tickets) {
                    if( week_tickets[day].length != 0){
                        return res.status(400).json({ 
                            message: "You cannot schedule a week as long as you have at least one ticket on that week ",
                          })
                    }
                } 

                for (const day in board.markup.days) 
                {
                    const possible_days= ['monday', 'tuesday','wednesday','thursday','friday','saturday','sunday']
                    if(!possible_days.includes(day))
                    {
                        break;
                    }
                    const open_hour = board.markup.days[day].open.split(':')[0];
                    const open_min = board.markup.days[day].open.split(':')[1];

                    const close_hour = board.markup.days[day].close.split(':')[0];
                    const close_min = board.markup.days[day].close.split(':')[1];

                    const duration = board.markup.duration

                    const current_day = new Date().getDay()
                    num_of_days = 8 - current_day + 7 * i + week_index[day]

                    const open_time = new Date(new Date().getTime() + num_of_days*24*60*60*1000);
                    open_time.setMinutes(open_min)
                    open_time.setHours(open_hour )

                    const timezoneOffset = open_time.getTimezoneOffset(); // Get the difference in minutes between the local time zone and UTC time
                    var new_open_time = new Date(open_time.getTime() - (timezoneOffset * 60 * 1000)); // Adjust the time by the offset
                    var ticket_time = new Date(open_time.getTime() - (timezoneOffset * 60 * 1000)); // Adjust the time by the offset


                    const close_time = new Date(new Date().getTime() + num_of_days*24*60*60*1000);
                    close_time.setHours(close_hour)
                    close_time.setMinutes(close_min)

                    const new_close_time = new Date(close_time.getTime() - (timezoneOffset * 60 * 1000)); // Adjust the time by the offset

                    while(addMinutes(ticket_time, duration) <= new_close_time)
                    {
                        
                        const ticket = await Ticket.create({table_id:board._id, user_id: null , datetime: ticket_time, duration: board.markup.duration,is_outdated: false, enabled: false, confirmed: false})
                        
                        board.tickets[i][day].push(ticket._id)

                        ticket_time = addMinutes(ticket_time, duration)
                    } 
                }
            }
        }

        if(!found_week)
        {
            return res.status(400).json({ 
                message: "Board does not have week with that id",
              })
        }
        board.save((error) => {
            if (error) {
                return res
                .status(201)
                .json({ message: "An error occurred", error: error.message });
            }
        });

        return res.status(200).json({ message: "Created successfully", board});
    }
    catch (error) {
        return res.status(400).json({
            message: "Week was not created",
            error: error.message,
        })
    }
})

const update = asyncHandler(async (req, res) => {
    const {id, label, description, service_name, req_confirm, book_num, markup, address, auto_open, apply_new_markup} = req.body
    const { created_tables } = req;

    const required_fields_present = (id && label && service_name && book_num && markup && auto_open)
    if ( !required_fields_present){
        return res.status(400).json({
            message: "Not all required fields are present",
          })
    }

    if (created_tables.length === 0 || !created_tables.find(boardId => boardId === id)) {
        return res.status(403).json({ message: 'Forbidden' })
    }

    try {
        const board = await Board.findByIdAndUpdate(
            id,
            {
                label,
                description,
                service_name,
                req_confirm,
                book_num,
                markup,
                address,
                auto_open
            }
        )
        if ((!(compareMarkup(markup, board.markup))) && (apply_new_markup === "true")) {
            
            

            //old
            for (i = 0; i < 6; i++) {

                const week_tickets = {monday: board.tickets[i].monday, tuesday: board.tickets[i].tuesday,
                wednesday: board.tickets[i].wednesday, thursday : board.tickets[i].thursday, 
                friday: board.tickets[i].friday, saturday: board.tickets[i].saturday, sunday: board.tickets[i].sunday}

                let found_enabled_ticket = false

                for (const day in week_tickets) {
                    let day_tickets = week_tickets[day]

                    let tickets_array = []
                    for (j in day_tickets)
                    {
                        const found_ticket = await Ticket.findById(day_tickets[j]).exec()

                        if (found_ticket) {
                            tickets_array.push(found_ticket)
                        }
                    }
                    
                    for (p = 0; p < tickets_array.length; p++) {
                        if (tickets_array[p].enabled &&  !tickets_array[p].is_outdated && tickets_array[p].user_id) {
                            found_enabled_ticket = true;
                            break
                        }
                    }
                } 

                if (found_enabled_ticket) {
                    continue
                }
                
                else {
                    for (const day in week_tickets) 
                    {
                        for (let j = week_tickets[day].length - 1; j >= 0; j--) {
                            const index = j;
                            const ticketId = week_tickets[day][index];
                            week_tickets[day].splice(index, 1); 
                            await Ticket.findByIdAndDelete(ticketId);
                          }
                          
                    }
                    
                    for (const day in markup.days) 
                    {
                        const open_hour = markup.days[day].open.split(':')[0];
                        const open_min = markup.days[day].open.split(':')[1];

                        const close_hour = markup.days[day].close.split(':')[0];
                        const close_min = markup.days[day].close.split(':')[1];

                        const duration = markup.duration

                        const current_day = new Date().getDay()
                        num_of_days = 8 - current_day + 7 * i + week_index[day]

                        const open_time = new Date(new Date().getTime() + num_of_days*24*60*60*1000);
                        open_time.setMinutes(open_min)
                        open_time.setHours(open_hour )

                        const timezoneOffset = open_time.getTimezoneOffset(); // Get the difference in minutes between the local time zone and UTC time
                        var new_open_time = new Date(open_time.getTime() - (timezoneOffset * 60 * 1000)); // Adjust the time by the offset
                        var ticket_time = new Date(open_time.getTime() - (timezoneOffset * 60 * 1000)); // Adjust the time by the offset


                        const close_time = new Date(new Date().getTime() + num_of_days*24*60*60*1000);
                        close_time.setHours(close_hour)
                        close_time.setMinutes(close_min)

                        const new_close_time = new Date(close_time.getTime() - (timezoneOffset * 60 * 1000)); // Adjust the time by the offset

                        while(addMinutes(ticket_time, duration) <= new_close_time)
                        {
                            
                            const ticket = await Ticket.create({table_id:board._id, user_id: null , datetime: ticket_time, duration: markup.duration,is_outdated: false, enabled: false, confirmed: false})
                            
                            board.tickets[i][day].push(ticket._id)

                            ticket_time = addMinutes(ticket_time, duration)
                        } 
                    }
                }
                board.tickets[i] = week_tickets                
            }

            await Board.findByIdAndUpdate(
                id,
                {
                   tickets: board.tickets
                }
            ) 
        }

        const updated_board = await Board.findById(id);

        return res.status(200).json({
            message: "Board updated succesfully", 
            board: updated_board
        })

    } catch (error) {
        return res.status(400).json({
            message: "Board was not saved",
            error: error.message,
        })
    }
})

const read = asyncHandler(async (req, res) =>{
    const { id } = req.body
    const { created_tables } = req;

    if (created_tables.length === 0 || !created_tables.find(boardId => boardId === id)) {
        return res.status(403).json({ message: 'Forbidden' })
    }

  try {const dbBoard = await Board.findById(id) 
    if(dbBoard)
    {
      res.status(200).json({
        message:"Get board",
        dbBoard
      })
    }
    else
    {
      return res.status(400).json({ message: 'Board not found' })
    }
    const board = {_id: dbBoard._id, markup: dbBoard.markup, owner_id: dbBoard.owner_id, label: dbBoard.label, 
    description: dbBoard.description, service_name: dbBoard.service_name, req_confirm: dbBoard.req_confirm,
    book_num: dbBoard.book_num, auto_open: dbBoard.auto_open}    
  } catch(error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    })
  }
})

const readOneWeek  = asyncHandler(async (req, res) =>{
    const { id, numberOfWeek } = req.params
    const { user_id } = req;

    try {
    const board = await Board.findById(id).exec()
    const isOwner = board.owner_id == user_id
    const showEnabledOnly = !isOwner;

    if (!board.members.find(memberId => memberId === user_id ) && !isOwner) {
        return res.status(403).json({ message: 'Forbidden' })
    }
        
    if(numberOfWeek > 5 || numberOfWeek < 0) 
    {
        return res.status(400).json({ message: 'Incorect number of the week' })
    }

    const week_tickets = {monday: board.tickets[numberOfWeek].monday, tuesday: board.tickets[numberOfWeek].tuesday,
        wednesday: board.tickets[numberOfWeek].wednesday, thursday : board.tickets[numberOfWeek].thursday, 
        friday: board.tickets[numberOfWeek].friday, saturday: board.tickets[numberOfWeek].saturday, sunday: board.tickets[numberOfWeek].sunday}

    const tickets = {}

    for(const day in week_tickets) {
        let day_tickets = week_tickets[day]

        for(const ticket_id in day_tickets)
        {
            const findTicket = await Ticket.findById(day_tickets[ticket_id])
            let ticketData = null;
            if (showEnabledOnly) {
                if (findTicket.enabled==true && !findTicket.user_id && findTicket.is_outdated === false) {
                    ticketData = getBoardTicketMember(findTicket)
                }
            } else {
                ticketData = await getBoardTicketOwner(findTicket)
            }

            if(ticketData){
                if (!tickets[day]?.length > 0) {
                    tickets[day] = []
                }
                tickets[day].push(ticketData)
            }
        }
    }
  res.status(200).json({
    message:"Get week tickets",
    tickets
  })
  } catch(error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    })
  }
})

const getBoard = asyncHandler(async (req, res) => {
    const {board_id} = req.body;
    const {user_id} = req;

    try {
            
        const board = await Board.findById(board_id);
        const {owner_id, label, description, service_name, req_confirm, book_num, markup, tickets, address, auto_open, members, requests} = board

        var available_tickets = [];
        if (board.members.includes(user_id) || user_id == board.owner_id ){
            
            for (i = 0; i < 6; i++) {

                const week_tickets = {monday: board.tickets[i].monday, tuesday: board.tickets[i].tuesday,
                wednesday: board.tickets[i].wednesday, thursday : board.tickets[i].thursday, 
                friday: board.tickets[i].friday, saturday: board.tickets[i].saturday, sunday: board.tickets[i].sunday}


                for (const day in week_tickets) {
                    let day_tickets = week_tickets[day]

                    for (j in day_tickets)
                    {
                        const found_ticket = await Ticket.findById(day_tickets[j]).exec()

                        if (found_ticket.enabled==true && !found_ticket.user_id && found_ticket.is_outdated === false) {
                            available_tickets.push(found_ticket);
                        }

                    }
                
                } 
            }
           
            res.status(200).json({
                label,
                description,
                service_name,
                address,
                available_tickets
              })
        }
        else{
            if (!board.requests.includes(user_id))
            { 
                board.requests.push(user_id); 
            }
           
            board.save();
            res.status(200).json({
                message: "User added to requests ",
                label,
                description,
                
              })
        }
    }catch (error) {
        res.status(400).json({
            message: "Board with that id doesn`t exist",
            error: error.message,
        })
    }

})

const addMember = asyncHandler(async (req, res) => {
    const {board_id, user_id, is_approved } = req.body;
    const {created_tables} = req;

    const required_fields_present = (board_id && user_id && is_approved)
    const user_obj_id = new ObjectId(user_id)
    const board_obj_id = new ObjectId(board_id)


    if (created_tables.length === 0 || !created_tables.find(boardId => boardId === board_id)) {
        return res.status(403).json({ message: 'Forbiden' })
    }

    if ( !required_fields_present){
        return res.status(400).json({ 
            message: "Not all required fields are present",
          })
        }
    try {
        const board = await Board.findById(board_obj_id);
        const user = await User.findById(user_obj_id);
        if(!board){
            return res.status(404).json({
                message: "Board with that id doesn`t exist",
            })
        }

        if(!user){
            return res.status(404).json({
                message: "User with that id doesn`t exist",
            })
        }

        if(is_approved === "false"){
            board.requests = board.requests.filter((requested_id)=>{ 
                return requested_id != user_obj_id;
            })
            board.save();
            return res.status(404).json({
                message:"Owner denied request. User deleted from requests.",
                members: board.members
              }) 
        }
        if(!board.requests.includes(user_id) && board.members.includes(user_id)){
            return res.status(204).json({});
        }
        else if(!board.requests.includes(user_id) && !board.members.includes(user_id)){
            return res.status(404).json({
                message:"Requested Id not found",
                members: board.members
              }) 
        }
        if(is_approved === "true" && !board.members.includes(user_id)){
            board.members.push(user_obj_id);
            user.membered_tables.push(board_obj_id);
            user.save();
        }
        board.requests = board.requests.filter((requested_id)=>{ 
            return requested_id != user_id;
        })
        board.save();

        return res.status(200).json({
            message:"User Added to members",
            members: board.members
          }) 
    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    }
})

const deleteBoard = async (req, res) => {
    const { id } = req.body;
    const { created_tables, user_id: owner_id } = req;

    if (created_tables.length === 0 || !created_tables.find(boardId => boardId === id)) {
        return res.status(403).json({ message: 'Forbidden' })
    }

    if (!id) {
        return res.status(400).json({ message: 'Board ID required' })
    }

    try {

    const board = await Board.findById(id).exec()

    if (!board) {
        return res.status(400).json({ message: 'Board not found' })
    }

    for(var user_id in board.members){
        const member = await User.findById(board.members[user_id]);
        member.membered_tables = member.membered_tables.filter((requested_id)=>{ 
            return requested_id != id;
        })
        member.save();
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
                const found_ticket = await Ticket.findById(week_tickets[day][j]).exec()

                if (!found_ticket) {
                    continue
                }

                if(found_ticket.user_id){

                    const user = await User.findById(found_ticket.user_id).exec();

                    let tak_tickets = user.taken_tickets.filter(requested_id => {
                        return requested_id.toString() !== found_ticket._id.toString() 
                    })

                    
                    await User.findByIdAndUpdate(
                        found_ticket.user_id, {taken_tickets : tak_tickets}
                      );

                }

                const result_ticket = await found_ticket.deleteOne()

                const reply = `Ticket with ID ${result_ticket._id} deleted`
            }
        }
    }
        
    const result = await board.deleteOne()
    
    const reply = `Board with ID ${result._id} deleted`

    const owner = await User.findById(owner_id).exec();
    owner.created_tables = owner.created_tables.filter(boardId => boardId.toString() !== id);
    await owner.save();

    return res.json(reply)

 } catch (error) {
    res.status(400).json({
        message: "Board was not deleted",
        error: error.message,
    })
}
}

module.exports = {
    create,
    createWeek,
    read,
    readOneWeek,
    update,
    getBoard,
    addMember,
    deleteBoard
}
