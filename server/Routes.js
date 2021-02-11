const {Pool} = require("pg");

const pool = new Pool({user: "postgres", password: "123456", database: "employee_databse", host: "localhost", port: 5432});

//routes// get all employees
const getEmployee = async(request, response) => {
  try {
    const results = await pool.query("SELECT id, last_name, first_name, to_char(date_of_birth, 'DD/MM/YYYY') AS date_o" +
        "f_birth, is_active FROM employee ORDER BY id ASC ");
    response
      .status(200)
      .json(results.rows);
  } catch (error) {
    console.error(error.message);
  }
};

//get employee
const getEmployeeById = async(request, response) => {
  const id = parseInt(request.params.id);
  try {
    const results = await pool.query("SELECT id, last_name, first_name ,is_active,date_of_birth FROM employee WHERE id=$1", [id]);
    response
      .status(200)
      .json(results);
  } catch (error) {
    console.error(error.message);
  }
};

//register an employee
const createEmployee = async(request, response) => {
  const {last_name, first_name, date_of_birth, is_active} = request.body;
  try {
    const results = await pool.query("INSERT INTO employee (last_name , first_name , date_of_birth, is_active) VALUES " +
        "($1, $2 ,$3,$4)",
    [last_name, first_name, date_of_birth, is_active]);
    response
      .status(201)
      .send(results);
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
//update a employee
const updateEmployee = async(request, response) => {
  const id = request.params.id;
  const {last_name, first_name, date_of_birth, is_active} = request.body;
  try {
    const results = await pool.query("UPDATE employee SET last_name= $1, first_name= $2, is_active=$3, date_of_birth=$4 WHERE id = $5", [last_name, first_name, is_active, date_of_birth, id]);
    response
      .status(200)
      .send("employee modified");
  } catch (error) {
    console.error(error.message);
  }
};
//delete a employee
const deleteEmployee = async(request, response) => {
  const id = request.params.id;
  try {
    const results= await pool.query("DELETE FROM employee WHERE id = $1", [id]);
    response
      .status(200)
      .send(`employee deleted with ID: ${id}`);
  } catch (err) {
    console.error(error.message);
  }
};

module.exports = {
  getEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
