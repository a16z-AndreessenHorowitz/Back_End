const multer  = require('multer')
module.exports=()=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')//Thư mục muốn lưu
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now(); //tên file muốn đặt
      cb(null,`${uniqueSuffix}-${file.originalname}`)
    },
  })
  return storage;
}