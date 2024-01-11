const express=require("express")
const { login, editUser, resetPassword } = require("../controllers/UserController")

const roomRouter=express.Router()

roomRouter.post("/login",login)
roomRouter.post("/edit/:id",editUser)
roomRouter.post("/reset",resetPassword)

module.exports=roomRouter