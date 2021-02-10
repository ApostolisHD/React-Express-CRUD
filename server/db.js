const { request, response } = require("express");
const {Pool , Client} = require("pg");
const bigInt = require("big-integer");


// const client = new Client({
//   connectionString: process.env.DATABASE_URL ,
//   ssl: process.env.DATABASE_URL ? true : false
// });

const client = new Client ({
    user: "postgres",
    password: "123456",
    database:"employee_databse",
    host: "localhost",
    port: 5432,
})

// const client = new Client ({
//     user: "gkavprwlnkszxv",
//     password: "ae28d6ef497bbaab23ec94743c0cc85e9eec3ba72dd8daa54830890572074a6c",
//     database:"dtikki8f2mtu0",
//     host: "ec2-34-247-118-233.eu-west-1.compute.amazonaws.com",
//     port: 5432,
//     ssl:false
// })
client.connect();

// pool.connect();

//routes//

//get all employees 
const getEmployee = async (request, response) => {
    try{
      await client.query("SELECT id, last_name, first_name, to_char(date_of_birth, 'DD/MM/YYYY') AS date_of_birth, is_active FROM employee ORDER BY id ASC ", (error,result) =>{
          response.status(200).json(result.rows)
          console.log(result)
         })
        }catch(error) 
      {
        console.error(error.message);
      }
    }

//get employee
const getEmployeeById = async (request, response) => {
  const id = parseInt(request.params.id)
    try{
        await client.query("SELECT id, last_name, first_name ,is_active FROM employee WHERE id=$1", [id] ,(error,result) =>{
        response.status(200).json(result)
        console.log(result)
    })   
      }catch(error) 
      {
        console.error(error.message);
      }
  }

//register an employee
const createEmployee = async (request, response) => {
    const {last_name,first_name,date_of_birth,is_active} = request.body;
    try{
    await client.query("INSERT INTO employee (last_name , first_name , date_of_birth, is_active) VALUES ($1, $2 ,$3,$4)", 
    [last_name, first_name, date_of_birth,is_active]);      
    response.status(201).send("Employee added!!!") 
    }catch(error) 
  {
    console.error(error.message);
  }
}
//update a employee
const updateEmployee = async(request, response) => {
    const id = request.params.id
    const {last_name,first_name,is_active} = request.body;
    try{
    client.query(
      "UPDATE employee SET last_name= $1, first_name= $2, is_active=$3 WHERE id = $4",
      [last_name,first_name,is_active,id])
        response.status(200).send("employee modified")
      }catch(error){
          console.error(error.message)
      }
    }
//delete a employee  
const deleteEmployee = async (request, response) => {
    const id = request.params.id
    try{
    client.query("DELETE FROM employee WHERE id = $1", [id])
    response.status(200).send(`employee deleted with ID: ${id}`)
    }catch(err){
        console.error(error.message)
    }
}
  
  module.exports = {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  }
