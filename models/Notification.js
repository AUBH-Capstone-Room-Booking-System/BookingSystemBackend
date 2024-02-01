const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectDb")
const Notification = sequelize.define("Notifications", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content:{
        type:DataTypes.STRING
    },
    status:{
        type: DataTypes.BOOLEAN,
    },
  

}, { timestamps: false, } // Add this to disable the default timestamps
);
module.exports = Notification;
