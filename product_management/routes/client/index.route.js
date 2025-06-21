const homeRoutes=require("./home.route")
const productRoutes=require("./product.route")
const categoryMiddleware=require("../../middlewares/client/category.middleware")
const searchRoutes=require("./search.route.js")
const cartRoutes=require("./cart.route.js")
const cartMiddleware=require("../../middlewares/client/cart.middleware")
const checkoutRoutes=require("./checkout.route.js")
module.exports=(app)=>{
  app.use(categoryMiddleware.category)
  app.use(cartMiddleware.cartId)
  //tất cả điều sử dụng dạnh mục này
  // bên admin cần có bảo mật nên sử dụng theo cách khác 

  app.use("/",homeRoutes)

  app.use("/products",productRoutes)

  app.use("/search",searchRoutes)

  app.use("/cart",cartRoutes)

  app.use("/checkout",checkoutRoutes)

}