const Mongoose = require("mongoose")
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
        },
        enabled: {
            type: Boolean,
            default: false,
        },
        confirmed: {
            type: Boolean,
            default: false,
        },
    },
    {versionKey: false}    
);

const Ticket = Mongoose.model("ticket", TicketSchema)
module.exports = Ticket
