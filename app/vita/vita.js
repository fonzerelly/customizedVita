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
    var i = 0;
    $scope.$watch(VitaLoader.getVita, function (vita) {
      angular.extend(self, vita);
    });
  }])
  .factory('VitaLoader', ['$http', function ($http) {
    var
    loadVita = function () {
      return $http.get("/mock_data/vita.json");
    },
    vitaData;
  var i = 0;

    return {
      loadVita: loadVita,
      getVita: function () {
        if (!vitaData) {
          vitaData = loadVita().success(function (data) {
            vitaData = data;
          });
        }
        if (vitaData.then) {
          return null;
        }
        return vitaData;
      }
    };
  }])
  .directive('cvJobRole', function () {
    return {
      restrict: "E",
      template: "<h3>{{job.title}} bei {{job.employer}}",
      scope: {
        job: '='
      },
    };
  })
  .directive('cvJobTasks', function() {
    return {
      restrict: "E",
      template: "<ul ng-repeat='task in job.tasks'><li>{{task.description}}</li></ul>",
      scope: {
        job: '='
      }
    };
  })
  .directive('cvJobTimeSpan', function() {
    return {
      restrict: "E",
      template: "<div>{{job.start | date : 'MMM / yy'}} - {{job.end | date : 'MMM / yy'}}</div>",
      scope: {
        job: '='
      }
    };
  })
