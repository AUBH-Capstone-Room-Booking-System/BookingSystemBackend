const express=require("express")
const { addRoom, getRooms } = require("../controllers/RoomController")

const roomRouter=express.Router()

roomRouter.post("/add",addRoom)
roomRouter.get("/find",getRooms)

module.exports=roomRouter