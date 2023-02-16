//const gitignoredConstants = require('./config/gitignoredConstants');

const Mongoose = require("mongoose")
const localDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clusterqa.dhdgpcl.mongodb.net/tableDB?retryWrites=true&w=majority`
const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB;