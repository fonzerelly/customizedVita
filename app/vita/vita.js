'use strict';

angular.module('customizedVita.vita', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/vita', {
      templateUrl: 'vita/vita.html',
      controller: 'VitaCtrl',
      controllerAs: 'vita'
    });
  }])
  .controller('VitaCtrl', ['$scope', 'VitaLoader', function($scope, VitaLoader) {
    var self = this;
    self.header = 'Lebenslauf';
    $scope.$watch(VitaLoader.getVita, function (vita) {
      angular.extend(self, vita);
      if (self.jobs) {
        $scope.job = self.jobs[0];
      }
    });
  }])
  .factory('VitaLoader', ['$http', function ($http) {
    var
    loadVita = function () {
      return $http.get("/mock_data/vita.json");
    },
    vitaData;

    return {
      getVita: function () {
        if (!vitaData) {
          vitaData = loadVita().success(function (data) {
            vitaData = data;
          });
          return {};
        }
        return vitaData;
      }
    };
  }])
  .directive('jobRole', function () {
    return {
      restrict: "E",
      template: "<h3>{{title}} bei {{employer}}",
      scope: {
        title: '@',
        employer: '@'
      },
    };
  });
