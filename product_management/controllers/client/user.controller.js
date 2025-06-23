
const User=require("../../models/user.model")
const md5 = require('md5');
// [GET] /user/register
module.exports.register= async(req, res)=>{


  res.render("client/pages/user/register",{
    pageTitle:"Đăng ký tài khoản"
  })
}


// [POST] /user/register
module.exports.registerPost= async(req, res)=>{
  console.log(req.body)
  //check đã tồn tại tài khoản đó chưa
  const existEmail=await User.findOne({
    email:req.body.email
  })
  if(existEmail){
    req.flash("error","Email đã tồn tại")
    res.redirect("back")
    return;
  }
  req.body.password=md5(req.body.password)

  const user=new User(req.body)
  await user.save();

  // console.log(user)
  //Lưu vào cookie
  res.cookie("tokenUser",user.tokenUser)
 res.redirect("/")
}

// [GET] /user/login
module.exports.login= async(req, res)=>{
  res.render("client/pages/user/login",{
    pageTitle:"Đăng nhập tài khoản"
  })
}

// [POST] /user/login
module.exports.loginPost= async(req, res)=>{
// console.log(req.body)
const email=req.body.email
const password=req.body.password
const user=await User.findOne({
  email:email,
  deleted:false,
})

if(!user){
  req.flash("error","Email không tồn tại")
  res.redirect("back")
  return 
}
if(md5(password) !==  user.password){
  req.flash("error","Email không tồn tại")
  res.redirect("back")
  return 
}

if(user.status==="inactive"){
  req.flash("error","Tài khoản đang bị khoá")
  res.redirect("back")
  return 
}
res.cookie("tokenUser",user.tokenUser)
res.redirect("/")
}


// [POST] /user/logout
module.exports.logout= async(req, res)=>{
  res.clearCookie("tokenUser")
  res.redirect("/")
}
