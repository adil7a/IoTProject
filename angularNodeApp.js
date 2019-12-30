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

app.get('/addParcel', function(req, res) {
  let queryCustomer = 'SELECT custId, custName, custLocation FROM Customers';
  let queryLocation = 'SELECT locId, locAddress, city FROM Locations';
  db.query(queryCustomer, function(err, resultsCus){
    if (err) throw err;
    db.query(queryLocation, function(err, resultsLoc){
      if (err) throw err;
      res.setHeader('Content-Type', 'text/html');
      res.render('ngParcel', {customers: resultsCus, locations: resultsLoc });
    })
  })
});

app.get('/insertParcel', function(req, res) {
  let weight = (req.query.txt_weight);
  let cus    = (req.query.txt_cus);
  let loc    = (req.query.txt_loc);
  let sql = 'INSERT INTO Parcels (weight, custId, finalLocation) VALUES(?, ?, ?)';
  let values = [weight, cus, loc];
  // create web content once insert statement is processed
  let postProcessInsert =   function (err, result) {
    if (err) throw err;
    res.setHeader('Content-Type', 'text/html');
    res.render('parcelsConfirm', {weight: weight, cus: cus, loc:loc, insertedLines: result.affectedRows, id: result.insertId});
  };
  db.query(sql, values, postProcessInsert);
});

// load routes: define cont roller which act on db
let routes = require('./components/routes.js');
routes(app, db);

// run server
app.listen(3003);