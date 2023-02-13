const gitignoredConstants = require('./config/gitignoredConstants');

const Mongoose = require("mongoose")
const localDB = `mongodb+srv://${gitignoredConstants.USER}:${gitignoredConstants.PASSWORD}@clusterqa.dhdgpcl.mongodb.net/tableDB?retryWrites=true&w=majority`
const connectDB = async () => {
  try {
    await Mongoose.connect(localDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB Connected")
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB;

