const User = require("../models/User")


const login=async(req,res)=> {
    try {
        const user=await User.findOne({where:{
            email:req.body.email,
            password:req.body.password
        }})
        if(user){
            res.status(200).json({user:user})
        }else{
            res.status(200).json({message:"wrong email or password"})
        }
    } catch (error) {
        res.status(500).json({message:"Server error!"})

    }
}

const editUser=async(req,res)=>{
    try {
        const id=req.params.id
        const user=await User.findOne({where:{
            id:id,
           
        }})
        user.firstName=req.body.firstName;
        user.lastName=req.body.lastName;
        user.email=req.body.email;
        user.phoneNumber=req.body.phoneNumber;
        await user.save()
        res.status(200).json({message:"updated successfully",user:user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error!"})

    }
}

const resetPassword=async(req,res)=>{
    try {
        const user=await User.findOne({where:{
            email:req.body.email,
        }})
        if(!user){
            res.status(404).json({message:"Email doesn't exist"})
        }

        user.password=req.body.password;
        await user.save()
        res.status(200).json({message:"updated successfully",user:user})
    } catch (error) {
        res.status(500).json({message:"Server error!"})

    }
}

module.exports={login,editUser,resetPassword}