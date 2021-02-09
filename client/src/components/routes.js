import React from "react";
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import RegisterForm from "./RegisterForm"
import EmployeeTable from "./Employees"

function Home(){
  return(
    <Router>
  
  <div className="demo-nav">
    <Link to="/">AddEmployee</Link>
    <Link to= "/employeelist">Applications</Link>
  </div>
  <div className="demo">
  <Switch>
    <Route exact path="/" component={RegisterForm} />
    <Route path="/employeelist" component={EmployeeTable}></Route>
  </Switch>
</div>
</Router>
  )
}
  export default Home;