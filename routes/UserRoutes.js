const express=require("express")
const { login, editUser, resetPassword, createUser, editUserAdmin, getAllUsers, deleteUser, getoneuser, getuserbyemail } = require("../controllers/UserController")

const userRouter=express.Router()

userRouter.post("/login",login)
userRouter.post("/edit/:id",editUser)
userRouter.post("/reset",resetPassword)
userRouter.post("/admin/add",createUser)
userRouter.post("/admin/edit/:id",editUserAdmin)
userRouter.get("/admin/findall",getAllUsers)
userRouter.get("/admin/findone/:id",getoneuser)
userRouter.post("/findbyemail",getuserbyemail)

userRouter.delete("/admin/delete/:id",deleteUser)

module.exports=userRouter