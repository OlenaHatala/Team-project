const Board = require('../models/Board')
//const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const create  = asyncHandler(async (req, res) => {
    const {label, description, service_name, req_confirm, book_num, markup, tickets, address, auto_open} = req.body

    try {
        await Board.create({
            label,
            description,
            service_name,
            req_confirm,
            book_num,
            markup,
            tickets,
            address,
            auto_open
        }).then((board) => 
            res.status(200).json({
                message: "Board created successfully",
                board,
            })
        )
    } catch (error) {
        res.status(400).json({
            message: "Board was not created",
            error: error.message,
        })
    }
})

module.exports = {
    create,
    //update,
    //delete
}