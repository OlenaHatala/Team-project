const Ticket = require('../models/Ticket')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')


const createNewTicket = asyncHandler(async (req, res) => {
    const { table_id, user_id, datetime, duration, is_outdated, enabled, confirmed } = req.body

    if (!table_id || !user_id || !datetime || !duration || !is_outdated || !enabled || !confirmed) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Create and store the new user 
    const note = await Note.create({ user, title, text })

    if (note) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

})

module.exports = {
    createNewTicket,
    //updateTicket,
    //deleteTicket
}