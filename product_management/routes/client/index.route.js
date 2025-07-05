const homeRoutes=require("./home.route")
const productRoutes=require("./product.route")
const categoryMiddleware=require("../../middlewares/client/category.middleware")
const searchRoutes=require("./search.route.js")
const cartRoutes=require("./cart.route.js")
const cartMiddleware=require("../../middlewares/client/cart.middleware")
const checkoutRoutes=require("./checkout.route.js")
const userRoutes=require("./user.route.js")
const userMiddleware=require("../../middlewares/client/user.middleware.js")
const settingMiddleware=require("../../middlewares/client/setting.middleware.js")
const chatRoutes=require("./chat.route.js")
const authMiddleware=require("../../middlewares/client/auth.middleware")


module.exports=(app)=>{
  app.use(categoryMiddleware.category)
  app.use(cartMiddleware.cartId)
  app.use(userMiddleware.infoUser)
  app.use(settingMiddleware.settingGeneral)
  //tất cả điều sử dụng dạnh mục này
  // bên admin cần có bảo mật nên sử dụng theo cách khác 

  app.use("/",homeRoutes)

  app.use("/products",productRoutes)

  app.use("/search",searchRoutes)

  app.use("/cart",cartRoutes)

  app.use("/checkout",checkoutRoutes)

  app.use("/user",userRoutes)

  app.use("/chat",authMiddleware.requireAuth,chatRoutes)

}