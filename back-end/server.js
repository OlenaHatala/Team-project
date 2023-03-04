const dotenv = require('dotenv');
dotenv.config();
const express = require("express")
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require("./db")
const cookies = require("cookie-parser");
const app = express()

app.use(cookies());



connectDB()

app.use(cors(corsOptions))

app.use(express.json())

app.use("/api/auth", require("./routes/userRoutes"))
app.use("/api/ticket", require("./routes/ticketRoutes"))
app.use("/api/board", require("./routes/boardRoutes"))

// app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`)\\)



const server = app.listen(process.env.API_PORT, () =>
  console.log(`Server Connected to port ${process.env.API_PORT}`)
)
// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})