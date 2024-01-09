const Room = require("../models/Room");
//get all users

const addRoom = async (req, res) => {
    try {
        const room =new Room({
            roomStatus:req.body.roomStatus,
            roomNumber:req.body.roomNumber,
        })
        await room.save()
        res.status(200).json({ room: room,message:"Added" });
    } catch (error) {
        res.status(500).json({ message: "Server error!" });
    }
}

const getRooms= async (req, res) => {
    try {
        const rooms =await Room.findAll();
        res.status(200).json({ rooms: rooms });
    } catch (error) {
        res.status(500).json({ message: "Server error!" });
    }
}

module.exports ={addRoom,getRooms}