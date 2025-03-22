const express = require('express')
const methodOverride = require('method-override')//method-override
const bodyParser = require('body-parser')
require ( 'dotenv' ) .config ()

const database=require('./config/database')

const systemConfig=require('./config/system.js')

const routeAdmin=require("./routes/admin/index.route.js")
const route=require("./routes/client/index.route.js")

database.connect()

const app = express()


const port = process.env.PORT;

app.use(methodOverride('_method')) //method-override

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', './views')
app.set('view engine', 'pug')


// app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin


app.use(express.static("public"));

routeAdmin(app)
route(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
