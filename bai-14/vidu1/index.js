const express = require('express')
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/poducts-test-b7-2023-01');

const Product = mongoose.model('Product', { 
    title: String,
    price: Number,
    thumbnail:String
});


const app = express()

const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render("index.pug",{
        title:"Trang chu",
        message:"Xin chao cac ban",
    });
})


app.get('/products',async (req, res) => {
    const products=await Product.find({});
    res.render("products",{
        titlePage:"Danh sách sản phẩm",
        products:products,
    });
   
})
app.get('/contact', (req, res) => {
    res.render("contact.pug",{
        title:"Trang liên hệ",
        message:"Xin chao cac ban",
    });
   
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});