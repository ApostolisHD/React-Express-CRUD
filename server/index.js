
const express = require("express");
const pool = require("./db");
const app = express();
const cors = require("cors");
const path = require('path');


var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.json());
app.use(cors());

// heroku try //
// app.use(express.static(path.join(__dirname, '/client/build')));

// app.get("*"), (request, response) => {
//   response.sendFile(path.join(__dirname + "/client/build/index.html"))
// }

app.get("/api/employee", pool.getEmployee)
app.get("/api/employee/:id", pool.getEmployeeById)
app.post("/api/register", pool.createEmployee)
app.put("/api/employee/:id", pool.updateEmployee)
app.delete("/api/employee/:id", pool.deleteEmployee)

app.listen(process.env.PORT || 5000, () => console.log("server running on port: http://localhost:5000"))