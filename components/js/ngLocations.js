locApp = angular.module('angLocApp', []);

locApp.controller('LocationsListController',  function($scope, $http) {
	
	let URL_ALL_LOCS = "http://etu-web2.ut-capitole.fr:3001/getAllLocations";
	let URL_INSERT_LOC = "http://etu-web2.ut-capitole.fr:3001/insLocation?";
    
	$scope.locations = [];
			
	$http.get(URL_ALL_LOCS).then(function(response) {
	
      $scope.locations =  response.data;
	  
    });
	
	$scope.newLocation = function() {
		let newRawLoc = {};
		let newLoc ={};
		$http.get(URL_INSERT_LOC + `newAddress=${$scope.newAddress}&city=${$scope.newCity}`)
			.then(function (response) {
				newRawLoc = response.data;
				
				newLoc = {"locId": newRawLoc.id, "locAddress": newRawLoc.address, 
									"city": newRawLoc.city};
		

				$scope.locations.push(newLoc);
			});
	}
});

