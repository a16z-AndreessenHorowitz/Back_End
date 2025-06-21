const Cart=require("../../models/cart.model.js");
const Product=require("../../models/product.model")
const productHelper=require("../../helpers/products.js")
const Order=require("../../models/order.model.js")


// [GET]/checkout 
module.exports.index=async(req,res)=>{
  const cartId=req.cookies.cartId
  
  const card=await Cart.findOne({
    _id:cartId
  })
  
  if(card.products.length>0){
    for (item of card.products){
      const productId=item.product_id
      const productInfo=await Product.findOne({
            _id:productId,
      }).select("title thumbnail slug price discountPercentage") //lấy theo các trường muốn chọn
      productInfo.priceNew=productHelper.priceNewProduct(productInfo)
      item.productInfo=productInfo
      //tông tiền từng sản phẩm
      item.totalPrice=productInfo.priceNew * item.quantity;
      
    }
    
  }
  
  // Tông đơn hàng của tất cả các hàng
  card.totalPrice=card.products.reduce((sum,item)=>sum+item.totalPrice,0)
  

  res.render("client/pages/checkout/index",{
    pageTitle:"Đặt hàng", 
    cardDetail:card
  })
}

// [POST]/checkout/order
module.exports.order=async(req,res)=>{
  const cartId=req.cookies.cartId;

  // console.log(req.body)
  let userInfo=req.body

  const cart=await Cart.findOne({
    _id:cartId,
  })
  console.log(cart)

  const products=[];
    // products:[
    //   {
    //     product_id:String,
    //     price:Number,
    //     quantity:Number,
    //     discountPercentage:Number,
    //   }
    // ],
  for(const product of cart.products){
    const objectProduct={
       product_id:product.product_id,
        price:0,
        quantity:product.quantity,
        discountPercentage:0,
    }
    const productInfo=await Product.findOne({
      _id:product.product_id
    }).select("price discountPercentage")

    objectProduct.price=productInfo.price
    objectProduct.discountPercentage=productInfo.discountPercentage
    // console.log(objectProduct)
    products.push(objectProduct)
  }
  // console.log(cartId)
  // console.log(userInfo)
  // console.log(products)

  //Lưu vào database
  const orderInfo={
    card_id:cartId,
    userInfo:userInfo,
    products:products
  }
  const order=new Order(orderInfo)
  order.save();
  //Trước khi riderect lại trang thì xoá hết mảng products trong giỏ hàng
  await Cart.updateOne({
    _id:cartId,
  },{
    products:[],
  })
  //khi lưu xong có id của order
  res.redirect(`/checkout/success/${order.id}`)
 

}


// [GET]/checkout/success/:orderId 
module.exports.success=async(req,res)=>{
  console.log(req.params.orderId)

  const order=await Order.findOne({
    _id:req.params.orderId,
  })
  // console.log(order)

  for(const product of order.products){
    const productInfo=await Product.findOne({
      _id:product.product_id
    }).select("title thumbnail")
    // console.log(prouctInfo)
    //thêm key mới
    product.productInfo=productInfo
    //thêm giá mới
    product.priceNew=productHelper.priceNewProduct(product)
    //Tổng tiền
    product.totalPrice=product.priceNew*product.quantity

  }

  //tổng tiền của đơn hàng
  order.totalPrice=order.products.reduce((sum,item)=>sum+item.totalPrice,0)
  console.log(order)
  res.render("client/pages/checkout/success",{
    pageTitle:"Đặt hàng thành công", 
    order:order
  })
}
