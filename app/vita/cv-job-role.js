angular.module('customizedVita.vita')
  .directive('cvJobRole', function () {
    "use strict";
    return {
      restrict: "E",
      template: "<h3>{{job.title}} bei {{job.employer}}",
      scope: {
        job: '='
      },
    };
  });
