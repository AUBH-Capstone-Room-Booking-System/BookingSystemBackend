const express=require("express")
const { addBooking, getFreeRooms, getConflictsReq, getBookings, editBooking, deleteBooking } = require("../controllers/BookingController")

const roomRouter=express.Router()

roomRouter.post("/add",addBooking)
roomRouter.post("/find",getFreeRooms)
roomRouter.post("/conflict",getConflictsReq)
roomRouter.get("/find/:id",getBookings)
roomRouter.post("/edit/:id",editBooking)
roomRouter.delete("/delete/:id",deleteBooking)





module.exports=roomRouter