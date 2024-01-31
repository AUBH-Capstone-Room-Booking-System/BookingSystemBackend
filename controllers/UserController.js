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

const editUserAdmin=async(req,res)=>{
    try {
        const id=req.params.id
        const user=await User.findOne({where:{
            id:id,
        }})
        user.firstName=req.body.firstName;
        user.lastName=req.body.lastName;
        user.email=req.body.email;
        user.phoneNumber=req.body.phoneNumber;
        user.userType=req.body.userType;
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
            return res.status(404).json({message:"Email doesn't exist"})
        }

        user.password=req.body.password;
        await user.save()
        res.status(200).json({message:"updated successfully",user:user})
    } catch (error) {
        res.status(500).json({message:"Server error!"})

    }
}

const createUser=async(req,res)=>{
    try {
        const {firstName,lastName,password,email,phoneNumber,major}=req.body
        const user=new User({
            
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            phoneNumber:phoneNumber,
            major:major,
            userType:"Client"
           
        })

        await user.save()
        res.status(201).json({message:"created user",user:user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error!"})

    }
}

const getAllUsers=async(req,res)=>{
    try {

        const users=await User.findAll({})

        res.status(200).json({users:users})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error!"})

    }
}

const deleteUser=async(req,res)=>{
    try {
        const userId=req.params.id;
        const user = await User.findOne({
            where: {
                id: userId,
            }
        });

        if (!user) {
            return res.status(404).json({ message: `user not found.` });
        }

        await user.destroy();

        res.status(200).json({ message: `user has been deleted.` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error!" });
    }

}

module.exports={login,editUser,resetPassword,createUser,editUserAdmin,getAllUsers,deleteUser}