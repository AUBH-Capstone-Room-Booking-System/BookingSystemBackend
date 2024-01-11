const express=require("express")
const { addRoomToFavorite, findAllFavorites, findOneFavorites, deleteFromFavorite } = require("../controllers/favoritesController")

const favoriteRouter=express.Router()

favoriteRouter.post("/add",addRoomToFavorite)
favoriteRouter.post("/findall",findAllFavorites)
favoriteRouter.post("/findone",findOneFavorites)
favoriteRouter.post("/delete",deleteFromFavorite)






module.exports=favoriteRouter