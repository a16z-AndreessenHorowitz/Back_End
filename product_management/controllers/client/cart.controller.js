const { response } = require("express");
const Cart=require("../../models/cart.model.js")
// [GET] /cart/add/:productId
module.exports.addPost=async (req, res)=>{
 const productId=req.params.productId;
 const quantity=parseInt(req.body.quantity)
 //lấy id giỏ hàng 
 const cartId=req.cookies.cartId;

 
 //check sản phẩm có tồn tại trong giỏ hàng hay chưa?
  const cart=await Cart.findOne({
    _id:cartId
  })


  const existProductInCart=cart.products.find(item=>
    item.product_id==productId
  );//hàm find trong js để tìm một, filter tìm nhiều

  // console.log(existProductInCart)
  if(existProductInCart){
    //nếu tồn tại
    const quantityNew=quantity+existProductInCart.quantity
    console.log(quantityNew)

   await Cart.updateOne(
      { _id: cartId, "products.product_id": productId },
      { $set: { "products.$.quantity": quantityNew} }
    );
    req.flash("info", "Đã cập nhật số lượng sản phẩm");
    res.redirect("back")

  }else{
    const objectCart={
    product_id:productId,
    quantity:quantity,
 }
  await Cart.updateOne(
    {
      _id:cartId
    },
    {
      $push:{ products: objectCart}
    }
  )

  req.flash("info","Đã thêm sản phẩm vào giỏ hàng")
  res.redirect("back");
  }
}