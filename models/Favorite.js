const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../configuration/connectDb")
const Favorite = sequelize.define("Favorites", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId:{
        type:DataTypes.INTEGER
    },
    roomNumber:{
        type: DataTypes.INTEGER,
    },
  

}, { timestamps: false, } // Add this to disable the default timestamps
);
module.exports = Favorite;
