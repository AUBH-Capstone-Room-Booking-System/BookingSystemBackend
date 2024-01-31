const express=require("express")
const { login, editUser, resetPassword, createUser, editUserAdmin, getAllUsers, deleteUser } = require("../controllers/UserController")

const userRouter=express.Router()

userRouter.post("/login",login)
userRouter.post("/edit/:id",editUser)
userRouter.post("/reset",resetPassword)
userRouter.post("/admin/add",createUser)
userRouter.post("/admin/edit/:id",editUserAdmin)
userRouter.get("/admin/findall",getAllUsers)
userRouter.delete("/admin/delete/:id",deleteUser)

module.exports=userRouter