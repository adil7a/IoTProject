
// init server
let express = require('express');
let app = express();

// database configuration
let mysql = require('mysql');

let db = mysql.createConnection(
 {
  host: 'localhost',
  user: '21808556',
  password: 'T00HN1',
  database: 'db_21808556'
 }
);

db.connect((err) => {
  if (err) throw err;
  
  console.log('Connected!');
}); 

// load routes: define controller which act on db
let routes = require('./components/routes.js');
routes(app, db);

// run server  
app.listen(3003);