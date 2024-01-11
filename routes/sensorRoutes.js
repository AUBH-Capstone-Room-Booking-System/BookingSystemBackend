const express=require("express")
const { addSensorData, getSensorData, editSensorData } = require("../controllers/SensorController")

const sensorRouter=express.Router()

sensorRouter.post("/add",addSensorData)
sensorRouter.post("/find",getSensorData)
sensorRouter.post("/edit",editSensorData)

module.exports=sensorRouter