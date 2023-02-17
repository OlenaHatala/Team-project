const Board = require('../models/Board')
const Ticket = require('../models/Ticket')
const asyncHandler = require('express-async-handler')

// function addMinutes(date, minutes) {

//     return date.setTime(date.getTime() + minutes*60000);
// }
const week_index = {
    'monday': 0,
    'tuesday': 1,
    'wednesday': 2,
    'thursday': 3,
    'friday': 4,
    'saturday': 5,
    'sunday': 6,
}

const create  = asyncHandler(async (req, res) => {
    const {owner_id, label, description, service_name, req_confirm, book_num, markup, address, auto_open} = req.body

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
            description,
            service_name,
            req_confirm,
            book_num,
            markup,
            tickets,
            address,
            auto_open
        })
        for (i = 0; i<6; i++)
        {
            for (const day in markup.days) {
            const open_hour = markup.days[day].open.split(':')[0];
            const open_min = markup.days[day].open.split(':')[1];
            
            const close_hour = markup.days[day].close.split(':')[0];
            const close_min = markup.days[day].close.split(':')[1];

            const duration = markup.duration
            
            const open_time = new Date(2000, 1, 1)
            open_time.setMinutes(open_min)
            open_time.setHours(open_hour)
            const close_time = new Date(2000, 1, 1)
            close_time.setHours(close_hour)
            close_time.setMinutes(close_min)

            let ticket_time = open_time.getTime()
            const add_min = (min) => {
                ticket_time = ticket_time + min * 60000
            }
            
            do{
                
                const current_day = new Date().getDay()
                
                num_of_days = 8 - current_day + 7 * i + week_index[day]

                const ticket_datetime = new Date(new Date().getTime() + num_of_days*24*60*60*1000)
                
                const ticket = await Ticket.create({table_id:board._id, user_id: null , datetime: ticket_datetime, duration: markup.duration,is_outdated: false, enabled: false, confirmed: false})
                
                board.tickets[i][day].push(ticket._id)

                add_min(duration)
            } while(ticket_time < close_time.getTime())
        }
           
        }
        board.save((error) => {
            if (error) {
              return res
                .status(200)
                .json({ message: "An error occurred", error: error.message });
            }
            res.status(201).json({ message: "Created successfully", board});
        });

    } catch (error) {
        res.status(400).json({
            message: "Board was not created",
            error: error.message,
        })
    }
})

const deleteBoard = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Board ID required' })
    }
    
    const board = await Board.findById(id).exec()

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
                const found_ticket = await Ticket.findById(week_tickets[day][j]).exec()

                if (!found_ticket) {
                    return res.status(400).json({ message: 'Ticket is not found' })
                }

                const result_ticket = await found_ticket.deleteOne()

                const reply = `Ticket '${result_ticket.title}' with ID ${result_ticket._id} deleted`
            }
        }
    }
        
    const result = await board.deleteOne()

    const reply = `Board '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}


module.exports = {
    create,
    //update,
    deleteBoard
}