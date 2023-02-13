const Mongoose = require("mongoose")
const BoardSchema = new Mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    service_name: {
        type: String,
        required: true,
    },
    req_confirm: {
        type: Boolean,
        default: false,
    },
    book_num: {
        type: Number,
        required: true,
    },
    markup: {
        type: [{
            monday: { type: Array },
            tuesday: { type: Array },
            wednesday: { type: Array },
            thursday: { type: Array },
            friday: { type: Array },
            saturday: { type: Array },
            sunday: { type: Array }
        }]
    },
    tickets: {
        type: [{
            monday: { type: Array },
            tuesday: { type: Array },
            wednesday: { type: Array },
            thursday: { type: Array },
            friday: { type: Array },
            saturday: { type: Array },
            sunday: { type: Array }
        }]
    },
    address: {
        type: String,
        required: true,
    },
    auto_open: {
        type: [{
            day: { type: String },
            ahead: { type: Number }
        }]
    }
})