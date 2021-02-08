const { request, response } = require("express");
const {Pool} = require("pg");
const bigInt = require("big-integer");

const pool = new Pool ({
    user: "omfdzpjoztradpostgres",
    password: "f522399c06eb376b76715a7be857afcf657546c736f9de0f959b4c83ae121d14",
    database:"dgsfgr7nf1ieg",
    host: "ec2-3-214-3-162.compute-1.amazonaws.com",
    port: 5432
})

//routes//

//get all employees 
const getEmployee = async (request, response) => {
    try{
      const allEmployee = await pool.query("SELECT id, last_name, first_name, to_char(date_of_birth, 'DD/MM/YYYY') AS date_of_birth, is_active FROM employee ORDER BY id ASC ", (q_err,q_res) =>{
          response.status(200).json(q_res)
          console.log(q_res)
         })
        }catch(err) 
      {
        console.error(err.message);
      }
    }



//get employee
const getEmployeeById = async (request, response) => {
  const id = request.params.id
    try{
        await pool.query("SELECT * FROM employee WHERE id=$1", [id] ,(q_err,q_res) =>{
        response.status(200).json(q_res)
        console.log(q_res)
    })   
      }catch(err) 
      {
        console.error(err.message);
      }
  }



//register an employee
const createEmployee = async (request, response) => {
    const {is_active,id} = request.body;
    last_name=request.body.last_name
    first_name=request.body.first_name
    date_of_birth= request.body.date_of_birth

    try{
    await pool.query("INSERT INTO employee (last_name , first_name , date_of_birth, is_active) VALUES ($1, $2 ,$3,false)", [last_name, first_name, date_of_birth]);
          
    response.status(201).send("Employee added!!!") // status created 
    }catch(err) 
  {
    console.error(err.message);
  }
}


//update a employee
const updateEmployee = async(request, response ,next) => {
    const id = request.params.id
    last_name=request.body.last_name
    first_name=request.body.first_name
    is_active=request.body.is_active
    try{
    pool.query(
      "UPDATE employee SET last_name= $1, first_name= $2, is_active=$3 WHERE id = $4",
      [last_name,first_name,is_active,id])
        response.status(200).send("employee modified")
      }catch(err){
          console.error(err.message)
      }
    }
  


//delete a employee  
const deleteEmployee = async (request, response) => {
    const id = request.params.id
    try{
    pool.query("DELETE FROM employee WHERE id = $1", [id])
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



  
// const loginEmployee = async (request , response) => {
//   const { last_name, first_name,is_active} = request.body;
//   const id = request.body.id
//   if(last_name && first_name){
//     //pool.query("UPDATE employee SET is_active=TRUE WHERE first_name = $1 AND last_name = $2 ",[last_name,first_name])
//   try{
//      await pool.query("SELECT id ,last_name, first_name FROM employee WHERE last_name =$1 AND first_name=$2 " ,[last_name,first_name],(q_err,q_res) =>{
//       if(q_res.rows) {
//         console.log(q_res)
//         response.send("Employee is now active")
//       }else{
//       response.send("Employee didnt found")
//       console.log(q_res)
//       }})
//     }
//     catch(err) 
//   {
//     console.error(err.message);
//   }
// }
// }
// const loginEmployee = function(request, response) {
// 	var first_name = request.body.first_name;
// 	var last_name = request.body.last_name;
// 	if (last_name && first_name) {
// 		pool.query('SELECT * FROM employee WHERE last_name = $1 AND first_name = $2', [last_name, first_name], function(error, results, fields){
// 			if (results > 0) {
// 				request.session.sessionEmployee = true;
// 				request.session.first_name = first_name;
// 				response.send("welcome")
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}			
// 			response.end();
// 		});
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// };