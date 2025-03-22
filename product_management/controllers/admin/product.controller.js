
const Product=require("../../models/product.model")

const filterStatusHeper=require("../../helpers/filterStatus")
const searchHeper=require("../../helpers/search.js")
const paginationHelper=require("../../helpers/pagiantion.js")
// [GET] /admin/products
module.exports.index= async(req, res)=>{
      //Đoạn này bộ lọc
		const filterStatus=filterStatusHeper(req.query)
    
		//Models
    let find={
        deleted:false,
		
    };

    if(req.query.status){
      find.status=req.query.status
    }

	//Đoạn này tìm kiếm
    const objectSearch=searchHeper(req.query)
	

	if(objectSearch.regax){
        find.title=objectSearch.regax;
	}
	//Paganation
	const countProducts=await Product.countDocuments(find);

	let objectPagiantion=paginationHelper({
		currentPage:1,
		limitItems:4
	}, req.query,countProducts)
	
	//Pagination
	//Models
    const products = await Product.find(find).limit(objectPagiantion.limitItems).skip(objectPagiantion.skip)

   

    res.render("admin/pages/products/index",{
        pageTitle:"Danh sách sản phẩm",
        products:products,
		filterStatus: filterStatus,
		keyword:objectSearch.keyword,
		pagination:objectPagiantion
    })
}
// [PATCH] /admin/products/change-status/:status/:
module.exports.changeStatus= async(req,res)=>{
	console.log(req.params)
	const status=req.params.status
	const id =req.params.id
	await Product.updateOne({ _id: id },{ status:status })   //update one thing
	res.redirect("back") //chuyển hướng //back chuyển hướng đúng tại trang đó
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti= async(req,res)=>{
	// console.log(req.body)

	const type=req.body.type;
	const ids=req.body.ids.split(", ");//convert lại 1 mảng

	switch(type){
		case "active":
			await Product.updateMany({ _id : { $in: ids }},{status:"active"})
			break;
		case "inactive":
			await Product.updateMany({ _id : { $in: ids }},{status:"inactive"})
			break;
		case "delete-all":
			await Product.updateMany({ _id : { $in: ids }},{deleted:true, deletedAt: new Date() })
			//deletemany xoá nhiều, chúng ta xoá mềm thui
			break;
		default:
		break;

	}
	res.redirect("back") //chuyển hướng //back chuyển hướng đúng tại trang đó
}

// [DELETE] /admin/products/change-status/:status/:
module.exports.deleteItem= async(req,res)=>{
	const id =req.params.id
//Xoá cứng, xoá vĩnh viễn
	//await Product.deleteOne({ _id: id })   //update one thing
//Xoá mềm để trường delected=true
	await Product.updateOne({ _id: id },{ deleted: true , deletedAt: new Date() });

// Chuyển hướng về trang trước đó hoặc trang chủ nếu không có Referrer
res.redirect(req.get("Referrer") || "/");
}
