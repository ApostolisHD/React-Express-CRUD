
const express = require ("express");
const pool = require("./db");
const app = express();
const PORT = 5000;
const cors = require("cors");


var session = require('express-session');
var bodyParser = require('body-parser');

// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.use(express.json()); //===>req the body database
app.use(cors());

app.get("/employee", pool.getEmployee)
app.post("/register", pool.createEmployee)
app.put("/employee/:id", pool.updateEmployee)
app.delete("/employee/:id", pool.deleteEmployee)
//app.post("/employee/login", pool.loginEmployee)
// app.get("/employee/auth",pool.sessionEmployee)
// app.post('/employee/login', pool.loginEmployee)

app.listen (process.env.PORT || 5000 ,() => console.log("server running on port: http://localhost:5000"))