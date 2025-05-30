const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
    title: String,
    product_category_id:{
        type: String,
        default:"",
    },
    description:String,
    category: String,
    price: Number,
    discountPercentage:Number,
    status: String,
    stock: Number,
    thumbnail: String,

    slug: { type: String,
        slug: "title",
        unique: true
    },
    createdBy:{
        account_id:String,
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deletedBy:{
        account_id:String,
        deletedAt:Date 
    },
    updatedBy:[ //lưu 1 mảng mới lưu dc nhiều người
        {
        account_id:String,
        updatedAt:Date 
        }
    ],
    position:Number,
    //deletedAt: Date
});

const Product = mongoose.model('Product', productSchema,'products');

module.exports = Product;