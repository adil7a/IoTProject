let express = require('express');
let app = express();
let ejs = require('ejs');

// init server
let path = require('path');
app.set('views', path.join(__dirname, 'components/views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);


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

// load routes: define cont roller which act on db
let routes = require('./components/routes.js');
routes(app, db);

// run server  
app.listen(3003);