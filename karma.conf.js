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
      'app/vita/vita.js',
      'app/vita/*.js'
    ],

    preprocessors : {
      'app/vita/!(*spec).js': 'coverage',
      'app/common/**/!(*spec).js': 'coverage'
    },

    reporters : ['coverage', 'spec'],

    coverageReporter : {
      reporters : [
        { type: 'html', dir: 'coverage/', file: 'coverage.html'},
        { type: 'text-summary'}
      ]
    },

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
            'karma-junit-reporter',
            'karma-coverage',
            'karma-spec-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
