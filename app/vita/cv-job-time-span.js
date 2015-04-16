angular.module('customizedVita.vita')
  .directive('cvJobTimeSpan', function() {
    "use strict";
    return {
      restrict: "E",
      template: "<div>{{job.start | date : 'MMM / yy'}} - {{job.end | date : 'MMM / yy'}}</div>",
      scope: {
        job: '='
      }
    };
  });
