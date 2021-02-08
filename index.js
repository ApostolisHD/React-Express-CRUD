
const express = require ("express");
const pool = require("./db");
const app = express();
const PORT = 5000;
const cors = require("cors");


var session = require('express-session');
var bodyParser = require('body-parser');

const whitelist = ['http://localhost:3000'​, 'http://localhost:5080'​,"https://git.heroku.com/sheltered-bastion-88856.git" ​]
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.use(express.json()); //===>req the body database
app.use(cors());

const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.get("/employee", pool.getEmployee)
app.post("/register", pool.createEmployee)
app.put("/employee/:id", pool.updateEmployee)
app.delete("/employee/:id", pool.deleteEmployee)
//app.post("/employee/login", pool.loginEmployee)
app.get("/employee/:id",pool.getEmployeeById)
// app.post('/employee/login', pool.loginEmployee)

app.listen (process.env.PORT || 5000 ,() => console.log("server running on port: http://localhost:5000"))