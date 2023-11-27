const express = require('express');
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
    host: 'database-2.cdbvdh3oxmwi.us-east-1.rds.amazonaws.com',
    user:'jdestrada',
    password:'12345678',
    port: 3306,
    database: 'Prueba'
}, 'single'));


//routes
app.use('/', Routes);


// static files

app.use(express.static(path.join(__dirname, 'public')));

//starting the server
app.listen(app.set('port'), ()=> {
    console.log("Sever on port 3000");
});