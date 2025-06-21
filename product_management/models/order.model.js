const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    // user_id:String,//trường hợp đăng nhập có user_id
    card_id:String,//trường hợp không đăng nhâp
    userInfo:{
      fullName:String,
      phone:String,
      address:String,
    },
    products:[
      {
        product_id:String,
        price:Number,
        quantity:Number,
        discountPercentage:Number,
      }
    ],
    deleted:{
      type:Boolean,
      default:false
    },
     deletedAt: Date   
},{
  timestamps:true,
});

const Order = mongoose.model('Order', OrderSchema,'orders');

module.exports = Order;  