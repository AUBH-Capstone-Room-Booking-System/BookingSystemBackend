const express=require("express")
const { getNotifications, addNotification } = require("../controllers/NotificationController")

const notificationRouter=express.Router()


notificationRouter.post("/add",addNotification)
notificationRouter.get("/",getNotifications)







module.exports=notificationRouter