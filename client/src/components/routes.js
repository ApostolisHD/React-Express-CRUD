import React from "react";
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import RegisterForm from "./RegisterForm"
import EmployeeTable from "./Employees"
import Edit from "./Edit"
function Home(){
  return(
    <Router>
  
  <div className="demo-nav">
    <Link to="/">Add Employee</Link>
    <Link to= "/employeelist">Employee List</Link>
  </div>
  <div className="demo">
  <Switch>
    <Route exact path="/" component={RegisterForm} />
    <Route exact path="/employeelist" component={EmployeeTable}></Route>
    <Route path="/employeelist/Edit/:id" component={Edit}></Route>
  </Switch>
</div>
</Router>
  )
}
  export default Home;