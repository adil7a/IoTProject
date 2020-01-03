parcelApp = angular.module('angParcelApp', []);

parcelApp.controller('ParcelsListController',  function($scope, $window, $http) {

    let URL_ALL_PARCELS = "http://localhost:3003/getAllParcelsHistory";

    $scope.parcels = [];



    $http.get(URL_ALL_PARCELS).then(function(response) {

        $scope.parcels =  response.data;

    });

    $scope.GetDetails = function(index) {
        $scope.parcelHistory = [];
        var loc = {
            parcelId:$scope.parcels[index].parcelId,
            locId:$scope.parcels[index].locId,
            date:$scope.parcels[index].date,
            time:$scope.parcels[index].time,
            operation:$scope.parcels[index].operation,
            locAddress:$scope.parcels[index].locAddress,
            city:$scope.parcels[index].city
        };
    $scope.parcelHistory.push(loc);
    }
});