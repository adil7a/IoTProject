locApp = angular.module('angLocApp', []);

locApp.controller('LocatedListController',  function($scope, $http) {
	let URL_ALL_LOCS = "http://localhost:3001/getAllLocations";
	let URL_ALL_PARC = "http://localhost:3001/getAllParcels2";
	let URL_INSERT_LOC = "http://localhost:3001/insLocated?";
    
	$scope.locations = [];
	$http.get(URL_ALL_LOCS).then(function(response) {
      $scope.locations =  response.data;
    });

	$scope.parcels = [];
	$http.get(URL_ALL_PARC).then(function(response) {
		$scope.parcels =  response.data;
	});
	
	$scope.newLocated = function() {
		let newRawLoc = {};
		let newLoc ={};
		$http.get(URL_INSERT_LOC + `newParcel=${$scope.newParcel}&newlocations=${$scope.newlocations}&newDate=${$scope.newDate}&newTime=${$scope.newTime}&newStatus=${$scope.newStatus}`)
			.then(function (response) {
				newRawLoc = response.data;
				newLoc = {"newParcel": newRawLoc.newParcel, "newlocations": newRawLoc.newlocations, "newDate": newRawLoc.newDate, "newTime": newRawLoc.newTime, "newStatus": newRawLoc.newStatus};
				$scope.locations.push(newLoc);
			});
	}
});

