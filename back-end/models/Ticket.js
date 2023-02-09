const Mongoose = require("mongoose")
<<<<<<< HEAD


const TicketSchema = new Mongoose.Schema({
        table_id: {
            type: Mongoose.Schema.Types.ObjectId,
            default: "",
        },
        user_id: {
            type:  Mongoose.Schema.Types.ObjectId,
            default: "",
        },
        datetime: {
            type: Date,
            //min: new Date(),
=======
const TicketSchema = new Mongoose.Schema({
        table_id: {
            type: ObjectID,
            default: "",
            required: true,
        },
        user_id: {
            type: ObjectID,
            default: "",
            required: true,
        },
        datetime: {
            type: Date,
            min: Date.now(),
>>>>>>> 89ce2bc (add Ticket.js)
            required: true,
        },
        duration: {
            type: Number,
            min: 0,
<<<<<<< HEAD
            default: 60,
=======
            required: true,
>>>>>>> 89ce2bc (add Ticket.js)
        },
        is_outdated: {
            type: Boolean,
            default: false,
<<<<<<< HEAD
=======
            required: true,
>>>>>>> 89ce2bc (add Ticket.js)
        },
        enabled: {
            type: Boolean,
            default: false,
<<<<<<< HEAD
=======
            required: true,
>>>>>>> 89ce2bc (add Ticket.js)
        },
        confirmed: {
            type: Boolean,
            default: false,
<<<<<<< HEAD
=======
            required: true,
>>>>>>> 89ce2bc (add Ticket.js)
        },
    },
    {versionKey: false}    
);

const Ticket = Mongoose.model("ticket", TicketSchema)
module.exports = Ticket
