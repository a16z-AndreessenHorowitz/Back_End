const express=require("express")
const validate=require("../../validates/client/user.validate")
const route=express.Router()

const controller=require("../../controllers/client/user.controller")


route.get("/register",controller.register)

route.post("/register",validate.register,controller.registerPost)

route.get("/login",controller.login)

route.post("/login",controller.loginPost)

module.exports=route