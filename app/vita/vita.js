'use strict';

angular.module('customizedVita.vita', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/vita', {
      templateUrl: 'vita/vita.html',
      controller: 'VitaCtrl',
      controllerAs: 'vita'
    });
  }])
  .directive('cvJobSelect', function() {
    return {
      restrict: "E",
      templateUrl: "vita/job-select.html",
      scope: {
        jobs: '=',
        currentJob: '='
      },
      link: function(scope, element, attr) {
        console.log(scope);
      }
    };
  })
  .controller('VitaCtrl', ['$scope', 'VitaLoader', function($scope, VitaLoader) {
    var self = this;
    self.header = 'Lebenslauf';
    $scope.$watch(VitaLoader.getVita, function (vita) {
      angular.extend(self, vita);
      if (self.jobs!==undefined) {
        self.currentJob = self.jobs[1];
      }
    });
  }]);
