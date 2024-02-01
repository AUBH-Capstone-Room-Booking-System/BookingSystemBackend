const express=require("express")
const { addBooking, getFreeRooms, getConflictsReq, getBookings, editBooking, deleteBooking, getDayBookings, getAllBookings } = require("../controllers/BookingController")

const roomRouter=express.Router()

roomRouter.post("/add",addBooking)
roomRouter.post("/find",getFreeRooms)
roomRouter.post("/conflict",getConflictsReq)
roomRouter.get("/find/:id",getBookings)
roomRouter.post("/edit/:id",editBooking)
roomRouter.delete("/delete/:id",deleteBooking)
roomRouter.post("/findbyday",getDayBookings)
roomRouter.get("/admin/findall",getAllBookings)




module.exports=roomRouter