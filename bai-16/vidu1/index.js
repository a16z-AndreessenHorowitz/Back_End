const express = require('express')
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


app.get('/products', (req, res) => {
    res.send("<h1>Trang danh sản phẩm</h1>")
   
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})