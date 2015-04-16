angular.module('customizedVita.vita')
  .directive('cvJobTasks', function() {
    "use strict";
    return {
      restrict: "E",
      template: "<ul ng-repeat='task in job.tasks'><li>{{task.description}}</li></ul>",
      scope: {
        job: '='
      }
    };
  });
