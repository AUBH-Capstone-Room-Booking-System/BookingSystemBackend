const { sequelize } = require("../configuration/connectDb");
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const { Op } = require('sequelize');

const addBooking = async (req, res) => {
    try {
        const guest=User.findOne({
            userId:req.body.userId,
        })
        const fullName=guest.firstName+" "+guest.lastName;
        const booking =new Booking({
            startDate:req.body.startDate,
            startTime:req.body.startTime,
            endTime:req.body.endTime,
            roomNumber:req.body.roomNumber,
            purpose:req.body.purpose,
            userId:req.body.userId,
            guest:fullName
        })
        await booking.save()
        res.status(200).json({ booking: booking,message:"Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error!" });
    }
}

const getConflictsReq = async (req,res) => {
    try {
        const { startDate, startTime, endTime,roomNumber } = req.body;

        const parseTime = (timeString) => {
            const [hours, minutes] = timeString.split(':');
            return { hours: parseInt(hours), minutes: parseInt(minutes) };
        };

        const startDateTime = parseTime(startTime);
        const endDateTime = parseTime(endTime);

        const conflictingBookings = await Booking.findAll({
            where: {
                roomNumber: roomNumber,
                startDate: startDate,
                [Op.or]: [
                    {
                        [Op.and]: [
                            sequelize.literal('TIME_TO_SEC(startTime) < TIME_TO_SEC(:endDateTime)'),
                            sequelize.literal('TIME_TO_SEC(endTime) > TIME_TO_SEC(:startDateTime)')
                        ]
                    },
                    {
                        [Op.and]: [
                            sequelize.literal('TIME_TO_SEC(startTime) >= TIME_TO_SEC(:startDateTime)'),
                            sequelize.literal('TIME_TO_SEC(startTime) < TIME_TO_SEC(:endDateTime)'),
                            sequelize.literal('TIME_TO_SEC(endTime) > TIME_TO_SEC(:startDateTime)'),
                            sequelize.literal('TIME_TO_SEC(endTime) <= TIME_TO_SEC(:endDateTime)')
                        ]
                    }
                ]
            },
            replacements: {
                startDateTime: `${startDateTime.hours}:${startDateTime.minutes}`,
                endDateTime: `${endDateTime.hours}:${endDateTime.minutes}`
            },
            type: sequelize.QueryTypes.SELECT
        });

        res.status(200).json({ conflictingBookings });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error!" });
    }
};

const getConflicts = async (startDate, startTime, endTime, roomNumber) => {
    try {
    
        const parseTime = (timeString) => {
            const [hours, minutes] = timeString.split(':');
            return { hours: parseInt(hours), minutes: parseInt(minutes) };
        };

        const startDateTime = parseTime(startTime);
        const endDateTime = parseTime(endTime);

        const conflictingBookings = await Booking.findAll({
            where: {
                roomNumber: roomNumber,
                startDate: startDate,
                [Op.or]: [
                    {
                        [Op.and]: [
                            sequelize.literal('TIME_TO_SEC(startTime) < TIME_TO_SEC(:endDateTime)'),
                            sequelize.literal('TIME_TO_SEC(endTime) > TIME_TO_SEC(:startDateTime)')
                        ]
                    },
                    {
                        [Op.and]: [
                            sequelize.literal('TIME_TO_SEC(startTime) >= TIME_TO_SEC(:startDateTime)'),
                            sequelize.literal('TIME_TO_SEC(startTime) < TIME_TO_SEC(:endDateTime)'),
                            sequelize.literal('TIME_TO_SEC(endTime) > TIME_TO_SEC(:startDateTime)'),
                            sequelize.literal('TIME_TO_SEC(endTime) <= TIME_TO_SEC(:endDateTime)')
                        ]
                    }
                ]
            },
            replacements: {
                startDateTime: `${startDateTime.hours}:${startDateTime.minutes}`,
                endDateTime: `${endDateTime.hours}:${endDateTime.minutes}`
            },
            type: sequelize.QueryTypes.SELECT
        });
        console.log(conflictingBookings.length);
        if(conflictingBookings.length>=1){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error!" });
    }
};


const getFreeRooms=async(req,res)=>{
    try {
        const { startDate, startTime, endTime } = req.body;
        const rooms = await Room.findAll({});
        const filteredRooms = [];

        for (const room of rooms) {
            const conflict = await getConflicts(startDate, startTime, endTime, room.roomNumber);
            if (conflict) {
                room.roomStatus = "Booked";
            }
            filteredRooms.push(room);
        }

        res.status(200).json({ rooms: filteredRooms });
    }  catch (er) {
        console.log(er);
        res.status(500).json({message:"Server error!"})

    }
}

const getBookings=async(req,res)=>{
    try {
        const userId=req.params.id
        const bookings=await Booking.findAll({where:{
            userId:userId
        }})

        res.status(200).json({bookings:bookings})
    } catch (error) {
        res.status(500).json({message:"Server error!"})
    }
}

const editBooking=async(req,res)=>{
    try {
        const prevBookingId=req.params.id
        var booking=await Booking.findOne({where:{
            id:prevBookingId
        }})
        console.log(booking);
        booking.roomNumber=req.body.roomNumber
        await booking.save()
        res.status(200).json({message:"Saved booking",booking:booking})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error!"})
    }
}

const deleteBooking = async (req, res) => {
    try {
        const bookingIdToDelete = req.params.id;
        const booking = await Booking.findOne({
            where: {
                id: bookingIdToDelete
            }
        });

        if (!booking) {
            return res.status(404).json({ message: `Booking with id ${bookingIdToDelete} not found.` });
        }

        await booking.destroy();

        res.status(200).json({ message: `Booking with id ${bookingIdToDelete} has been deleted.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error!" });
    }
};

const getDayBookings = async (req, res) => {
    try {

        const bookings = await Booking.findAll({
            where: {
                userId: req.body.userId,
                startDate: req.body.startDate
            }
        });

        res.status(200).json({ bookings: bookings });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Server Error!" });
    }
};


module.exports ={addBooking,getDayBookings,getFreeRooms,getConflicts,getConflictsReq,getBookings,editBooking,deleteBooking}