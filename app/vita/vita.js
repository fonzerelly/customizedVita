'use strict';

angular.module('customizedVita.vita', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/vita', {
      templateUrl: 'vita/vita.html',
      controller: 'VitaCtrl'
    });
  }])
  .controller('VitaCtrl', ['$scope', function($scope) {
    $scope.header = 'Lebenslauf';
  }])
  .factory('VitaLoader', ['$http', function ($http) {
    return {
      loadVita: function () {
        return $http.get("/mock_data/vita.json")
          .success(function(data) {
            return data;
          })
          .error(function(data) {
            return data;
          });
      }
    };
  }]);
