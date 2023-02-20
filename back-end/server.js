const constants = require('./config/constants');

const express = require("express")
const connectDB = require("./db")
const cookies = require("cookie-parser");
const app = express()
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');



connectDB()



app.use(credentials);

app.use(cors(corsOptions));

app.use(cookies());


app.use(express.json())

app.use("/api/auth", require("./routes/userRoutes"))
app.use("/api/ticket", require("./routes/ticketRoutes"))
app.use("/api/board", require("./routes/boardRoutes"))

// app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))



const server = app.listen(constants.PORT, () =>
  console.log(`Server Connected to port ${constants.PORT}`)
)
// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})