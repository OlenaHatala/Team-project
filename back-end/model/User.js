const Mongoose = require("mongoose")
const UserSchema = new Mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
  },
  {versionKey: false}
);

const User = Mongoose.model("user", UserSchema)
module.exports = User