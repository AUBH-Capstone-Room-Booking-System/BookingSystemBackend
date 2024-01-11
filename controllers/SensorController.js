const Sensor = require("../models/SensorData")


const addSensorData=async(req,res)=>{
    try {
        const {roomNumber,motion,temperature,humidity,airQuality}=req.body
        const sensorData=new Sensor({
            roomNumber:roomNumber,
            motion:motion,
            temperature:temperature,
            humidity:humidity,
            airQuality:airQuality
        })
        await sensorData.save()
        res.status(201).json({message:"added sensor data!",sensorData:sensorData})
    } catch (error) {
        res.status(500).json({message:'server error!'})
    }
}

const editSensorData=async(req,res)=>{
    try {
        const {roomNumber,motion,temperature,humidity,airQuality}=req.body
        const sensorData=await Sensor.findOne({where:{
            roomNumber:roomNumber
        }})
        
        sensorData.motion=motion;
        sensorData.temperature=temperature;
        sensorData.humidity=humidity;
        sensorData.airQuality=airQuality;
        await sensorData.save()
        res.status(201).json({message:"edited sensor data!",sensorData:sensorData})
    } catch (error) {
        res.status(500).json({message:'server error!'})
    }
}

const getSensorData=async (req,res)=>{
    try {
        const {roomNumber}=req.body
        const sensor=await Sensor.findOne({where:{
            roomNumber:roomNumber
        }})
    
        res.status(200).json({sensorData:sensor})
    } catch (error) {
        res.status(500).json({message:'server error!'})
    }
}


module.exports ={addSensorData,editSensorData,getSensorData}