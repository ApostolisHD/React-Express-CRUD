# React-Express-CRUD


This Project is using ANTD

download or git clone the project files.


## cd into both Project Directories in 2 different terminal windows and then install the dependencies

The "Client" directory contains the React code. The "Server" directory contains the code for the node.js express server. This project requries a PSQL database to run.

For intructions on installing PSQL visit the offical PSQL website:
<br />
https://www.postgresql.org/ 



#### 1st window
`cd Client`

#### 2nd window
`cd Server`

#### 1st window
`npm install` 

#### 2nd window
`npm install` 

<br />

### Run both the server and client at the same time

#### 1st window 
`npm start`
(runs react at localhost:3000)

#### 2nd window 
`npm run devstart` 
(runs nodemon at localhost:5000)


<ol>
  <li>Open the PSQL shell and login to PSQL</li>
  <li>Create a new PSQL database. </li>
  <li>Simply copy the SQL code in the Server/database.sql file and paste it in as commands into the PSQL shell.  </li> 
  <li> In the Server/Routes.js file replace the code with the login info for your own PSQL database. </li>
  <li> After setting up the PSQL database and making the required adjustments in the Routes.js file, the app will be fully functional. </li> 
</ol>




