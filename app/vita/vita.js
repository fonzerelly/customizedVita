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
  .factory('SearchService', ['$window', function ($window) {
    /*global _*/
    var

    split = _.curry(function(separator, string) {
      return string.split(separator);
    }),

    leave = _.curry(function(count, string) {
      return string.slice(count);
    }),

    flattenPairList = _.curry(function(key, pairs) {
      var flattend = _.pull(_.flatten(pairs), key);
      return (flattend.length > 1) ?
        flattend :
        flattend[0];
    }),

    splitUrlSearch = _.compose(
       _.partial(_.map, _, split('=')),
      split('&'),
      leave(1)
    ),

    transformGroupedPairs = _.partial(
      _.transform,
      _,
      function(result, pairList, key) {
        result[key] = flattenPairList(key, pairList);
      }
    ),

    objectizeUrlSearch = _.compose(
      transformGroupedPairs,
      _.partial(_.groupBy, _, _.head),
      splitUrlSearch
    ),

    serializeSearchObject = function(searchObj) {
      var serialized = _.map(searchObj, function(value, key) {
        return (_.isArray(value))?
            serializeKeyArray(key, value):
            serializeKeyValue(key, value);
      });
      return "?" + serialized.join('&');
    },

    serializeKeyValue = _.curry(function(key, value) {
      return key + "=" + value;
    }),

    serializeKeyArray = function (key, array) {
      return _.map(array, serializeKeyValue(key)).join("&");
    };


    return {
      split                 : split,
      leave                 : leave,
      flattenPairList       : flattenPairList,
      splitUrlSearch        : splitUrlSearch,
      transformGroupedPairs : transformGroupedPairs,
      objectizeUrlSearch    : objectizeUrlSearch,
      serializeSearchObject : serializeSearchObject,
      serializeKeyValue     : serializeKeyValue,
      serializeKeyArray     : serializeKeyArray,
    };
  }]);
