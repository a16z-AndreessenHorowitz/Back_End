//tính giá mới cho một mảng
module.exports.priceNewProducts=(products)=>{
  const newProducts=products.map((item)=>{
        item.priceNew=((item.price*(100-item.discountPercentage)/100)).toFixed(0)
        return item;
    })
  return newProducts
}
// tính giá mới cho một sản phẩm

module.exports.priceNewProduct=(product)=>{
  const priceNew=parseInt((product.price*(100-product.discountPercentage)/100).toFixed(0))
  return priceNew
}