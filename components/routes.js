module.exports = (app, db) => {

app.get('/', function(req, res) {
     
	// send the main (and unique) page
    res.setHeader('Content-Type', 'text/html');
    res.sendFile( __dirname + '/views' + '/menu.html');
});

app.get('/addLocations', function(req, res) {
	// send the main (and unique) page
    res.setHeader('Content-Type', 'text/html');
    res.sendFile( __dirname + '/views' + '/ngLocations.html');
});

app.get('/ngLocations.js', function(req, res) {
	// send the angular app
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile( __dirname + '/js' + '/ngLocations.js');
});

app.get('/ngCustomers.js', function(req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile( __dirname + '/js' + '/ngCustomers.js');
});


app.get('/getAllLocations', function(req, res) {
     
		let sql = 'SELECT locId, locAddress, city FROM Locations';
		

		// response contains a json array with all tuples
		let postProcessSQL =   function (err, result) {
			if (err) throw err;

			res.json(result);
		};
  
		db.query(sql, postProcessSQL);
	
        
});

app.get('/getAllCustomers', function(req, res) {
     
		let sql = 'SELECT custId, custName, custLocation FROM Customers';
		

		// response contains a json array with all tuples
		let postProcessSQL =   function (err, result) {
			if (err) throw err;

			res.json(result);
		};
  
		db.query(sql, postProcessSQL);
	
        
});

app.get('/delCustomer', function(req, res) {
    
    let custID = req.query.custId;
		let sql = 'DELETE FROM Customers WHERE custId = ?';
                let values = [custID];
		

		// response contains a json array with all tuples
		let postProcessSQL =   function (err, result) {
			if (err) throw err;

			res.json(result);
		};
  
		db.query(sql, postProcessSQL);
	
        
});

app.get('/all', function(req, res) {
	// send the main (and unique) page
    res.setHeader('Content-Type', 'text/html');
    res.sendFile( __dirname + '/views' + '/ngCustomers.html');
});

app.get('/insLocation', function(req, res) {
    	let address = (req.query.newAddress);
        let city    = (req.query.newCity);
 
		let sql = 'INSERT INTO Locations(locAddress, City) VALUES(?, ?)';
		let values = [address, city];

		// create a json object containing the inserted location
		let postProcessInsert =   function (err, result) {
			if (err) throw err;

			res.json({id: result.insertId, address: address, city: city, 
			                  insertedLines: result.affectedRows });
		};
  
		db.query(sql, values, postProcessInsert);
 
		
});


}

