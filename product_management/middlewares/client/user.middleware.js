const User=require("../../models/user.model")
module.exports.infoUser=async(req,res,next)=>{
  //nếu có trả thông tin user, không có thì cứ cho đăng nhập bình thường
  if(req.cookies.tokenUser){
    const user=await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted:false,
      status:"active"
    }).select("-password")
    if(user){
      res.locals.user=user;
    }
  }
 
  next();
}