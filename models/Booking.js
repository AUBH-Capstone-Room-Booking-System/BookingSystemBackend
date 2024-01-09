const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectDb")
const Booking = sequelize.define("bookings", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    startDate: {
        type: DataTypes.STRING,
    },
    startTime: {
        type: DataTypes.STRING,
    },
    endTime:{
        type: DataTypes.STRING,
    },
    roomNumber:{
        type:DataTypes.INTEGER
    },
    purpose:{
        type:DataTypes.STRING
    },
    userId:{
        type:DataTypes.INTEGER

    }
}, { timestamps: false, } // Add this to disable the default timestamps
);
module.exports = Booking;
