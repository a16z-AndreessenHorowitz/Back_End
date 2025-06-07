var md5 = require('md5');
const Account=require("../../models/account.model.js")

module.exports.index=(req,res)=>{
res.render("admin/pages/my-account/index",{
  pageTitle:"Thông tin cá nhân",
})
}

module.exports.edit=(req,res)=>{
res.render("admin/pages/my-account/edit",{
  pageTitle:"Thông tin cá nhân",
})
}
module.exports.editPatch=async (req,res)=>{
  const id=res.locals.user.id
  const emailExist= await Account.findOne({
    _id:{
      $ne: id//loại trừ id này ra còn lại tìm hết
    },
    email:req.body.email,
    deleted:false
  })
  if(emailExist){
    req.flash("error","Cập nhật tài khoản không thành công")

  }
  else{
    if(req.body.password){
      req.body.password=md5(req.body.password)
    }else{
      delete req.body.password
    }
    await Account.updateOne({_id:id},req.body)
    req.flash("info","Cập nhật tài khoản thành công")

  }
  res.redirect("back")
}