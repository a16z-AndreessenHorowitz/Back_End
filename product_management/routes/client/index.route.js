const homeRoutes=require("./home.route")
const productRoutes=require("./product.route")
const categoryMiddleware=require("../../middlewares/client/category.middleware")


module.exports=(app)=>{
  app.use(categoryMiddleware.category)
  //tất cả điều sử dụng dạnh mục này
  // bên admin cần có bảo mật nên sử dụng theo cách khác 

  app.use("/",homeRoutes)

  app.use("/products",productRoutes)

}