'use strict';

angular.module('interviewAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('testResults', {
        url: '/testResults',
        templateUrl: 'app/test-results/test-results.view.html',
        controller: 'TestResultsController',
        controllerAs: 'testResultsCtrl'
      });
  });
