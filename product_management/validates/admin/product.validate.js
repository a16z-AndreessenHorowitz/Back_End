module.exports.creatPost=(req,res,next)=>{
  if(!req.body.title){
		req.flash("error","Vui lòng nhập tiêu đề")
		res.redirect("back")
		return; //Ngăn chặn dòng code phía dưới
	}
  next()
}