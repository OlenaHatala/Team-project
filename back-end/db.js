const Mongoose = require("mongoose")
const localDB = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@clusterqa.dhdgpcl.mongodb.net/tableDB?retryWrites=true&w=majority`
const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB