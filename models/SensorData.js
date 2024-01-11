const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectDb")
const Sensor = sequelize.define("Sensors", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roomNumber:{
        type:DataTypes.INTEGER
    },
    motion:{
        type: DataTypes.STRING,
    },
    temperature:{
        type: DataTypes.STRING,
    },
    airQuality:{
        type: DataTypes.STRING,
    },
    humidity:{
        type: DataTypes.STRING,
    },
  

}, { timestamps: false, } // Add this to disable the default timestamps
);
module.exports = Sensor;
