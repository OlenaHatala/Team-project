const Mongoose = require("mongoose")
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
            required: true,
        },
        duration: {
            type: Number,
            min: 0,
            required: true,
        },
        is_outdated: {
            type: Boolean,
            default: false,
            required: true,
        },
        enabled: {
            type: Boolean,
            default: false,
            required: true,
        },
        confirmed: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    {versionKey: false}    
);

const Ticket = Mongoose.model("ticket", TicketSchema)
module.exports = Ticket
