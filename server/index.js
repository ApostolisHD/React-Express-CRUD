const express = require("express");
const app = express();
const db = require("./Routes");
const cors = require("cors");

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.post("/api/register", db.createEmployee);
app.get("/api/employee", db.getEmployee);
app.get("/api/employee/:id", db.getEmployeeById);
app.put("/api/employee/:id", db.updateEmployee)
app.delete("/api/employee/:id", db.deleteEmployee);

app.listen(process.env.PORT || 5000, () => console.log("server running on port: http://localhost:5000"));