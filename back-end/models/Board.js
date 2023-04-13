const Mongoose = require("mongoose")

const BoardSchema = new Mongoose.Schema({
        owner_id : {
            type:  Mongoose.Schema.Types.ObjectId,
            required: true,
        },
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
            duration: {type: Number},//min
            days:{
                monday: {  
                    open: {type: String}, 
                    close: {type: String},
                    day_off: {type: Boolean}, 
                    hours: {type: Array}
                },
                tuesday: {  
                    open: {type: String}, 
                    close: {type: String}, 
                    day_off: {type: Boolean},
                    hours: {type: Array}
                },
                wednesday:{
                    open: {type: String}, 
                    close: {type: String}, 
                    day_off: {type: Boolean},
                    hours: {type: Array}
                },
                thursday: {
                    open: {type: String}, 
                    close: {type: String}, 
                    day_off: {type: Boolean},
                    hours: {type: Array}
                },
                friday: {
                    open: {type: String}, 
                    close: {type: String}, 
                    day_off: {type: Boolean},
                    hours: {type: Array}
                },
                saturday: {
                    open: {type: String}, 
                    close: {type: String}, 
                    day_off: {type: Boolean},
                    hours: {type: Array}
                },
                sunday: {
                    open: {type: String}, 
                    close: {type: String}, 
                    day_off: {type: Boolean},
                    hours: {type: Array}
                }
            },
        },
        tickets:
        [{
            monday:  { type: Array },
            tuesday: { type: Array },
            wednesday: { type: Array },
            thursday: { type: Array },
            friday: { type: Array },
            saturday: { type: Array },
            sunday: { type: Array }
        },
        {
            monday: { type: Array },
            tuesday: { type: Array },
            wednesday: { type: Array },
            thursday: { type: Array },
            friday: { type: Array },
            saturday: { type: Array },
            sunday: { type: Array }
        },
        {
            monday: { type: Array },
            tuesday: { type: Array },
            wednesday: { type: Array },
            thursday: { type: Array },
            friday: { type: Array },
            saturday: { type: Array },
            sunday: { type: Array }
        },
        {
            monday: { type: Array },
            tuesday: { type: Array },
            wednesday: { type: Array },
            thursday: { type: Array },
            friday: { type: Array },
            saturday: { type: Array },
            sunday: { type: Array }
        },
        {
            monday: { type: Array },
            tuesday: { type: Array },
            wednesday: { type: Array },
            thursday: { type: Array },
            friday: { type: Array },
            saturday: { type: Array },
            sunday: { type: Array }
        },
        {
            monday: { type: Array },
            tuesday: { type: Array },
            wednesday: { type: Array },
            thursday: { type: Array },
            friday: { type: Array },
            saturday: { type: Array },
            sunday: { type: Array }
        }],
            
        address: {
            type: String,
            required: false,
        },
        auto_open: {
            day: { type: String },
            ahead: { type: Number }
        },
        members: {
            type: Array,
            default: []
        },
        requests: {
            type: Array,
            default: []
        }
    },
    {versionKey: false}
);

const Board = Mongoose.model("board", BoardSchema)
module.exports = Board
