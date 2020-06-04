const express = require('express')
const path = require('path')
const cors = require('cors');
moment   = require('moment');
imageLib 	= require('./lib/image');//you can include all your lib
var compression = require('compression');
const bodyParser = require('body-parser');
const fileUpload    = require('express-fileupload');
formidable = require('formidable');
jwt = require("jsonwebtoken");

const app = express()
const port = 3000



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());





let configDB = require('./config/database.js');
constant    = require('./config/constants.js');
auth         = require('./config/auth.service.js');
mysql        = require('mysql');
const QueryBuilder = require('node-querybuilder');
query = new QueryBuilder(configDB, 'mysql', 'single');


// global error handler

require("./route/route.js")(app);

app.use(fileUpload());
app.use(compression()); //use compression 


app.use(express.static(path.join(__dirname, 'public')));



app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'application/views/'))
app.set('view engine','html');



app.listen(port, () => console.log(`Example app listening on port ${port}!`))