module.exports = function(config){
  'use strict';
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/lodash/lodash.js',
      'app/components/**/*.js',
      'app/common/**/*.js',
      'app/view*/**/*.js',
      'app/vita/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : [
    // 'Chrome'
    'PhantomJS'
    ],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
