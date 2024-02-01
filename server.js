const express = require("express");
const {connectDb}=require('./configuration/connectDb')
const cors = require('cors');
const path  = require('path')

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../client/build");
connectDb();

app.use(express.static(buildPath))

app.use(cors())
app.use(express.json())

const roomRouter = require("./routes/RoomRoutes");
app.use("/room", roomRouter);

const bookingRouter = require("./routes/BookingRoutes");
app.use("/booking", bookingRouter);

const userRouter = require("./routes/UserRoutes");
app.use("/user", userRouter);

const sensorRouter = require("./routes/sensorRoutes");
app.use("/sensor", sensorRouter);

const favoriteRouter = require("./routes/favoriteRoutes");
app.use("/favorite", favoriteRouter);

const notificationRouter = require("./routes/NotificationRoutes");
app.use("/notification", notificationRouter);

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          }
        }
      );
  
  })

  app.listen(port, (er) => {
    if (er) {
    console.log(err);
    } else {
    console.log(`server is running on port ${port}`);
    }
    });