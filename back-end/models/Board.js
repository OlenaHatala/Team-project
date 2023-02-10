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
    address: {
        type: String,
        required: true,
    },
})
