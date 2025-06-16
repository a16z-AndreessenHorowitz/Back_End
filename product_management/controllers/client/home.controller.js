const Product=require("../../models/product.model")
const productHelper=require("../../helpers/products.js")

// [GET] /
module.exports.index= async(req, res)=>{
   //Lấy ra sản phẩm nổi bật
   const productsFeatured=await Product.find({
    featured: "1",
    deleted:false,
    status:"active"
    }).limit(6)
    const newProducts=productHelper.priceNewProducts(productsFeatured)

   //end
   
   //Lấy ra sản phẩm mới nhất
   const productsNew=await Product.find({
    deleted:false,
    status:"active"
   }).sort({position:"desc"}).limit(6)
    const newProductsNew=productHelper.priceNewProducts(productsNew)

   //Hết


    res.render("client/pages/home/index",{
        pageTitle:"Trang chủ",
        productsFeatured:newProducts,
        productsNew: newProductsNew
    })
}