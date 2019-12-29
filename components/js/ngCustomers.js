cusApp = angular.module('angCusApp', []);

cusApp.controller('CustomersListController',  function($scope, $http) {
	
    let URL_ALL_CUST = "http://etu-web2.ut-capitole.fr:3001/getAllCustomers";
    let URL_DEL_CUST = "http://etu-web2.ut-capitole.fr:3001/delCustomer?";
    
    $scope.customers = [];
    $http.get(URL_ALL_CUST).then(function(response) {
      $scope.customers =  response.data;
    });
	
    $scope.confirmDelete = function(ctd){
        //ask to confirm
        okDel = window.confirm('Are you sure to delete' + ctd.custId); //maybe add name
        if (okDel == true){
            $http.get(URL_DEL_CUST+'custId='+ctd.custId).then(
                //delete in DB
                function(response){
                    index= $scope.customers.findIndex(ctd);
                    $scope.customers.splice(index,1) 
                }
                //need to refrech the view = update the model
        )            
        }
        //delete(service /delCustomer) if ok
    }
    
    
	/*$scope.newLocation = function() {
		let newRawLoc = {};
		let newLoc ={};
		$http.get(URL_INSERT_LOC + `newAddress=${$scope.newAddress}&city=${$scope.newCity}`)
			.then(function (response) {
				newRawLoc = response.data;
				
				newLoc = {"locId": newRawLoc.id, "locAddress": newRawLoc.address, 
									"city": newRawLoc.city};
		

				$scope.locations.push(newLoc);
			});
	}*/
});

