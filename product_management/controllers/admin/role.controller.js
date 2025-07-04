const Role=require("../../models/roles.model")
const systemConfig=require("../../config/system")
const { json } = require("body-parser")
// [GET] /admin/roles
module.exports.index=async (req, res)=>{
let find={
  deleted:false,
}

const records=await Role.find(find)

  res.render("admin/pages/roles/index",{
      pageTitle:"Nhóm quyền",
      records: records,
  })
}

// [GET] /admin/roles/create
module.exports.create=async (req, res)=>{

    res.render("admin/pages/roles/create",{
        pageTitle:"Tạo nhóm quyền",
    })
  }


  // [POST] /admin/roles/create
module.exports.createPost=async (req, res)=>{
  const record=new Role(req.body)
  await record.save()
  res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/edit/:id
module.exports.edit=async (req, res)=>{
  try {
  const id=req.params.id
  let find={
    _id:id,
    deleted:false,
  }

  const data=await Role.findOne(find)
  console.log(data)

  res.render("admin/pages/roles/edit",{
      pageTitle:"Tạo nhóm quyền",
      data:data,
  })
    
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
  }
}

  // [PATCH] /admin/roles/edit/:id
module.exports.editPatch=async (req, res)=>{
    const id=req.params.id
    await Role.updateOne({_id:id}, req.body)
    res.redirect(`back`)
}
  
  // [GET] /admin/roles/permissions
module.exports.permissions=async (req, res)=>{
   let find={
    deleted:false,
   }
   const records= await Role.find(find)
  res.render("admin/pages/roles/permissions",{
    pageTitle:"Phân quyền",
    records:records
  })
}

  // [PATCH] /admin/roles/permissions
module.exports.permissionsPatch=async (req, res)=>{
  console.log(req.body)
  // chuỗi json biến lại thành mảng
  const permissions=JSON.parse(req.body.permissions)  //lưu theo cái name gửi lên

  for(const item of permissions){
    await Role.updateOne({_id:item.id},{permissons:item.permissions})
  }

  req.flash("info","Cập nhật phân quyền thành công")
  res.redirect("back")
}
