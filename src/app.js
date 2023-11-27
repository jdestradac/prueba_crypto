const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection')
const app= express();


//importing routes
const Routes = require('./routes/routes');
 
// settings
app.set('port', process.env.PORT||3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//middlewares
app.use(morgan('dev'))
app.use(myConnection(mysql,{
    host: process.env.host_db,
    user: process.env.user_db,
    password: process.env.password_db,
    port: process.env.port_db,
    database: process.env.database_name
}, 'single'));



//routes
app.use('/', Routes);


// static files

app.use(express.static(path.join(__dirname, 'public')));

//starting the server
app.listen(app.set('port'), ()=> {
    console.log("Sever on port 3000");
});

console.log()