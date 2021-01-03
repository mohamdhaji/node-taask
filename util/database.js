const mysql = require("mysql");



const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307,
  database: "website",
  password: "root",
});
con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

module.exports = con;
