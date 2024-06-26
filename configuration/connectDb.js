const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
url="mysql://root:@localhost:3306/testDatabase"
const sequelize=new Sequelize(url,{
dialect: 'mysql',
logging: false, // Set to false to disable logging

});
const connectDb = async () => {
try {
await sequelize.authenticate();
console.log("Connected to MySQL successfully.");
await sequelize.sync();
} catch (error) {
console.error('Connection to MYSQL failed:', error);
}
};
module.exports = {connectDb,sequelize};
