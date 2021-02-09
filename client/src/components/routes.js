import React from "react";
import loginForm from "./LoginForm"
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import RegisterForm from "./RegisterForm"
import EmployeeTable from "./Employees"

function Home(){
  return(
    <Router>
  
  <div className="demo-nav">
    <Link to="/">Login</Link>
    <Link to="/api/register">Register</Link>
    <Link to= "/api/employeelist">Applications</Link>
  </div>
  <div className="demo">
  <Switch>
    <Route exact path="/" component={loginForm} />
    <Route path="/register" component={RegisterForm} />
    <Route path="/employeelist" component={EmployeeTable}></Route>
  </Switch>
</div>
</Router>
  )
}
  export default Home;