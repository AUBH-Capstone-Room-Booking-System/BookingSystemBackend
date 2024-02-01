const Favorite = require("../models/Favorite")

const addRoomToFavorite=async(req,res)=>{
    try {
        const {roomNumber,userId}=req.body
        const favorite=new Favorite({
            roomNumber:roomNumber,
            userId:userId
        })
        await favorite.save()
        res.status(201).json({message:"added to favorites!",favorite:favorite})
    } catch (error) {
        res.status(500).json({message:'server error!'})
    }
}

const deleteFromFavorite=async(req,res)=>{
        try {
            const {roomNumber,userId} = req.body
            console.log(req.body.roomNumber);
            console.log(req.body.userId);
            const favorite = await Favorite.findOne({
                where: {
                    userId: userId,
                    roomNumber:roomNumber
                }
            });
    
            if (!favorite) {
                return res.status(404).json({ message: `Favorite not found.` });
            }
    
            await favorite.destroy();
    
            res.status(200).json({ message: `Favorite has been deleted.` });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server Error!" });
        }
    
}

const findAllFavorites=async(req,res)=>{
    try {
        const {userId}=req.body
        const favorites=await Favorite.findAll({where:{
            userId:userId
        }})
        res.status(200).json({favorites:favorites})
    } catch (error) {
        res.status(500).json({ message: "Server Error!" });

    }
}



const findOneFavorites=async(req,res)=>{
    try {
        const {userId,roomNumber}=req.body
        const favorite=await Favorite.findOne({where:{
            userId:userId,
            roomNumber:roomNumber
        }})

        res.status(200).json({favorite:favorite})
    } catch (error) {
        res.status(500).json({ message: "Server Error!" });

    }
}


module.exports ={findOneFavorites,findAllFavorites,deleteFromFavorite,addRoomToFavorite}