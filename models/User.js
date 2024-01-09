const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectDb")
const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userType:{
        type: DataTypes.STRING,
    },
    firstName:{
        type: DataTypes.STRING,
    },
    lastName:{
        type: DataTypes.STRING,
    },
    phoneNumber:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
}, { timestamps: false, } // Add this to disable the default timestamps
);
module.exports = User;
