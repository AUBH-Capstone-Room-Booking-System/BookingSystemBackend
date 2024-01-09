const express=require("express")
const { login, editUser } = require("../controllers/UserController")

const roomRouter=express.Router()

roomRouter.post("/login",login)
roomRouter.post("/edit/:id",editUser)


module.exports=roomRouter