angular.module('customizedVita.vita')
  .factory('VitaLoader', ['$http', function ($http) {
    'use strict';
    var
    loadVita = function () {
      return $http.get('/mock_data/vita.json');
    },
    vitaData;

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
  }]);
