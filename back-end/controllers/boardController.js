const Board = require('../models/Board')
const User = require('../models/User')
const Ticket = require('../models/Ticket')
const asyncHandler = require('express-async-handler')
var db = require('../db')

function addMinutes(date, minutes) {
    return date.setTime(date.getTime() + minutes*60000);
}

const create  = asyncHandler(async (req, res) => {
    const {owner_id, label, description, service_name, req_confirm, book_num, markup, tickets, address, auto_open} = req.body

    try {

        
        // console.log(markup)
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
            // console.log(markup.days[day])
            const open_hour = markup.days[day].open.split(':')[0];
            const open_min = markup.days[day].open.split(':')[1];
            
            const close_hour = markup.days[day].close.split(':')[0];
            const close_min = markup.days[day].close.split(':')[1];

            const duration = markup.duration
            
            const open_time = new Date(2000, 1, 1)
            open_time.setMinutes(open_min)
            open_time.setHours(open_hour)
            console.log('1')
            const close_time = new Date(2000, 1, 1)
            close_time.setHours(open_hour)
            close_time.setMinutes(open_min)

            let ticket_time = open_time.getTime()
            const add_min = (min) => {
                ticket_time = ticket_time + min * 60000
            }
            do{
                
                const current_day = new Date().getDay()
                let markup_day = 0
                
                if (day === 'tuesday')
                {
                    markup_day = 1
                }
                if (day === 'wednesday')
                {
                    markup_day = 2
                }
                if (day === 'thursday')
                {
                    markup_day = 3
                }
                if (day === 'friday')
                {
                    markup_day = 4
                }
                if (day === 'saturday')
                {
                    markup_day = 5
                }
                if (day === 'sunday')
                {
                    markup_day = 6
                }
                num_of_days = 8 - current_day + 7 * i + markup_day

                const ticket_datetime = new Date(new Date().getTime() + num_of_days*24*60*60*1000)
                const ticket = Ticket.create({table_id:board._id, user_id: null , datetime: ticket_datetime, duration: markup.duration,is_outdated: false, enabled: false, confirmed: false})
                // __
                console.log('2')

                add_min(duration)
                console.log(ticket_time)
            } while(ticket_time < close_time.getTime())
        }
            
        }
        res.status(200).json({
            message: "Board created successfully",
            board
        })

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

    const result = await board.deleteOne()

    const reply = `Board '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}


module.exports = {
    create,
    //update,
    deleteBoard
}