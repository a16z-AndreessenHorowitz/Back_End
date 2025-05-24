const express=require("express")
const route=express.Router()

const controller=require("../../controllers/admin/auth.controller.js")
const validate=require("../../validates/admin/auth.validate.js")
route.get("/login",controller.login)
route.post("/login",
validate.loginPost,
controller.loginPost
)

route.get("/logout",controller.logout)


module.exports=route