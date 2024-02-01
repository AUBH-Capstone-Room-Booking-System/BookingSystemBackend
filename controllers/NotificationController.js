const Notification = require("../models/Notification");

const addNotification=async(req,res)=>{
    try {
        const {content}=req.body
        const notification=new Notification({
            content:content,
            status:false
        })
await notification.save();
        res.status(200).json({notification:notification})
    } catch (error) {
        res.status(500).json({ message: "Server Error!" });

    }
}

const getNotifications=async(req,res)=>{
    try {
        const notifications=await Notification.findAll({});
        res.status(200).json({notifications:notifications})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error!" });

    }
}

module.exports={getNotifications,addNotification}