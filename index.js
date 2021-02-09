
const express = require ("express");
const pool = require("./db");
const app = express();
const cors = require("cors");
const path = require('path');


var bodyParser = require('body-parser');
const { request, response } = require("express");



app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.use(express.json()); //===>req the body database
app.use(cors());

app.use(express.static(path.join(__dirname, '/client/public')));

app.get("*") ,(request,response) => {
  response.sendFile(path.join(__dirname + "/client/public/index.html"))
}

app.get("/api/employee", pool.getEmployee)
app.post("/api/register", pool.createEmployee)
app.put("/api/employee/:id", pool.updateEmployee)
app.delete("/api/employee/:id", pool.deleteEmployee)



app.listen (process.env.PORT || 5000 ,() => console.log("server running on port: http://localhost:5000"))