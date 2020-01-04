parcelApp = angular.module('angParcelApp', []);

parcelApp.controller('ParcelsListController',  function($scope, $window, $http) {

    let URL_ALL_PARCELS = "http://localhost:3001/getAllParcels2";
    let URL_HISTORY_PARCEL = "http://localhost:3001/getAllLocated";
    let URL_DELETE_PARCEL_OPERATION = "http://localhost:3001/delParcelOperation";

    $scope.parcels = [];
    $scope.parcelHistory = [];
    $http.get(URL_ALL_PARCELS).then(function(response) {

        $scope.parcels =  response.data;

    });

    $scope.GetDetails = function(pid) {
        $http.get(URL_HISTORY_PARCEL + '/' + pid).then(function(response) {

            $scope.parcelHistory =  response.data;

        });

    }

    $scope.CancelOperation = function(his) {
        let deleteOperation = false;
        deleteOperation = window.confirm("Delete Operation with Parcel ID " + his.parcelId + " having operation "
            +  his.operation);
        if(deleteOperation == true) {
            $http.get(URL_DELETE_PARCEL_OPERATION + '/' + his.locId).then(function(response) {
                var index = $scope.parcelHistory.findIndex(history => history.locId === his.locId);
                console.log($scope.parcelHistory.length);
                $scope.parcelHistory.splice($scope.parcelHistory.length - 1, 1);

            });
        }


    }
});