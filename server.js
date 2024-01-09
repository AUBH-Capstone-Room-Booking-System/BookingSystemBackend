const express = require("express");
const {connectDb}=require('./configuration/connectDb')
const cors = require('cors');

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

connectDb();

app.listen(port, (er) => {
if (er) {
console.log(err);
} else {
console.log(`server is running on port ${port}`);
}
});
app.use(cors())
app.use(express.json())

const roomRouter = require("./routes/RoomRoutes");
app.use("/room", roomRouter);

const bookingRouter = require("./routes/BookingRoutes");
app.use("/booking", bookingRouter);

const userRouter = require("./routes/UserRoutes");
app.use("/user", userRouter);