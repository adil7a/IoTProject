module.exports = (app, db) => {
	app.get('/', function(req, res) {
		// send the main (and unique) page
		res.setHeader('Content-Type', 'text/html');
		res.sendFile( __dirname + '/views' + '/menu.html');
	});

	app.get('/addLocated', function(req, res) {
		// send the main (and unique) page
		res.setHeader('Content-Type', 'text/html');
		res.sendFile( __dirname + '/views' + '/ngLocated.html');
	});

	app.get('/addParcel', function(req, res) {
		// send the main (and unique) page
		res.setHeader('Content-Type', 'text/html');
		res.sendFile( __dirname + '/views' + '/ngParcels.html');
	});

	app.get('/showHistory', function(req, res) {
		// send the main (and unique) page
		res.setHeader('Content-Type', 'text/html');
		res.sendFile( __dirname + '/views' + '/ngParcelHistory.html');
		});

	app.get('/ngLocated.js', function(req, res) {
		// send the angular app
		res.setHeader('Content-Type', 'application/javascript');
		res.sendFile( __dirname + '/js' + '/ngLocated.js');
	});

	app.get('/ngParcelsHistory.js', function(req, res) {
		res.setHeader('Content-Type', 'application/javascript');
		res.sendFile( __dirname + '/js' + '/ngParcelsHistory.js');
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

	app.get('/getAllParcels2', function(req, res) {
		let sql = 'SELECT * FROM Parcels';
		console.log('getAllParcels2');
		// response contains a json array with all tuples
		let postProcessSQL =   function (err, result) {
			if (err) throw err;
			console.log(result);
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

	app.get('/getAllLocated', function(req, res) {
		let sql = 'SELECT * FROM Located L, Locations LO WHERE L.locId = LO.locId';
		// response contains a json array with all tuples
		let postProcessSQL =   function (err, result) {
			if (err) throw err;
			console.log(result);
			res.json(result);
		};
		db.query(sql, postProcessSQL);
	});

	app.get('/getAllLocated/:parcelId', function(req, res) {
		let { parcelId } = req.params;
		let sql = 'SELECT * FROM Located L WHERE L.parcelId = ?';
		let values = [parcelId];
		// response contains a json array with all tuples
		let postProcessSQL =   function (err, result) {
			if (err) throw err;
			console.log(result);
			res.json(result);
		};
		db.query(sql, values, postProcessSQL);
	});

	app.get('/getAllParcels', function(req, res) {
		let queryString = 'SELECT DISTINCT * FROM Customers C, Parcels P WHERE C.custId = P.custId';
		db.query(queryString, function(err, results, fields){
			if (err) throw err;
			// call ejs to send the form
			res.setHeader('Content-Type', 'text/html');
			res.render('viewParcel', {parcels: results });
		})
	});

	app.get('/insLocated', function(req, res) {
		let newParcel = (req.query.newParcel);
		let newlocations    = (req.query.newlocations);
		let newDate    = (req.query.newDate);
		let newTime    = (req.query.newTime);
		let newStatus    = (req.query.newStatus);

		let sql = 'INSERT INTO Located(parcelId, locId, date, time, operation) VALUES(?, ?, ?, ?, ?)';
		let values = [newParcel, newlocations, newDate, newTime, newStatus];

		// create a json object containing the inserted operation
		let postProcessInsert =   function (err, result) {
			if (err) throw err;
				res.json({parcelId: newParcel, locId: newlocations, date: newDate, time: newTime, operation: newStatus,
					  insertedLines: result.affectedRows });
		};
		db.query(sql, values, postProcessInsert);
	});

	app.get('/delParcelOperation/:locId', function(req, res) {
		let { locId } = req.params;
		let sql = 'DELETE FROM Located WHERE locId = ?';
		let values = [locId];
		// response contains a json array with all tuples
		let postProcessSQL =   function (err, result) {
			if (err) throw err;
			res.json({deletedLines: result.affectedRows });
		};
		db.query(sql, values, postProcessSQL);
	});
};

