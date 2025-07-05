const express = require('express')
const app = express();
const methodOverride = require('method-override')//method-override
const bodyParser = require('body-parser')
require ( 'dotenv' ) .config ()
const session = require('express-session');
const flash = require('express-flash');
const moment=require("moment")
const path=require('path')
const cookieParser = require('cookie-parser');
const http = require('http');
const server = http.createServer(app);



const database=require('./config/database')

const systemConfig=require('./config/system.js')

const routeAdmin=require("./routes/admin/index.route.js")
const route=require("./routes/client/index.route.js");
const { resolveSoa } = require('dns');

database.connect()




const port = process.env.PORT;
// socket 
const { Server } = require("socket.io");
const io = new Server(server);
global._io=io; //global là toàn cục của express
//end socker
app.use(methodOverride('_method')) //method-override

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(`${__dirname}/public`));

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

//time cme
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//time cme

//flash
app.use(session({
  secret: 'MHUY231',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
//end flash

// app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.locals.moment = moment




routeAdmin(app)
route(app)
app.get("*",(req,res)=>{
  res.render("client/pages/errors/404",{
    pageTitle:"404 not found"
  })
})


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
