const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
 res.send(`<h1>Trang chủ</h1>
    <p>Tôi là nam</p>
`)

})

app.get('/products', (req, res) => {
    res.send("<h1>Trang danh sản phẩm</h1>")
   
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})