const express=require("express")
const route=express.Router()

const controller=require("../../controllers/client/cart.controller")
route.get("/add/:productId",controller.addPost)
route.post("/add/:productId",controller.addPost)

module.exports=route