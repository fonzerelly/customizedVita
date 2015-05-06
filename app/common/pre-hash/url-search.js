angular.module('PreHash', [])
  .factory('UrlSearch', ['$window', function ($window) {
    /*global _*/
    "use strict";

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

    hasOneElement = function (array) {
      return array.length === 1;
    },

    //check if you can chain hasOneElement
    cleanQuasiEmptyObject = function (array) {
      if (hasOneElement(array) &&
          hasOneElement(array[0]) &&
          array[0][0] === ''
     ) {
       return [];
     }
     return array;
    },


    splitUrlSearch = _.compose(
        cleanQuasiEmptyObject,
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
