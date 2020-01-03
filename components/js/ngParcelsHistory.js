parcelApp = angular.module('angParcelApp', []);

parcelApp.controller('ParcelsListController',  function($scope, $window, $http) {

    let URL_ALL_PARCELS = "http://localhost:3003/getAllParcelsHistory";

    $scope.parcels = [];

    $http.get(URL_ALL_PARCELS).then(function(response) {

        $scope.parcels =  response.data;

    });

    $scope.GetDetails = function(index) {
        var parcelId = $scope.parcels[index].parcelId;
        var locId = $scope.parcels[index].locId;
        var date = $scope.parcels[index].date;
        var time = $scope.parcels[index].time;
        var operation = $scope.parcels[index].operation;
        var locAddress = $scope.parcels[index].locAddress;
        var city = $scope.parcels[index].city;

        $window.alert("Parcel ID: " + parcelId + "\nLoc ID: " + locId + "\nDate: " + date + "\nTime: " + time +
             "\nOperation: " + operation + "\nLocation Address: " + locAddress + "\nCity: " + city);
    }
});