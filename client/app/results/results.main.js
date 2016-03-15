'use strict';

angular.module('interviewAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('results', {
        url: '/results',
        templateUrl: 'app/results/results.view.html',
        controller: 'ResultsController',
        controllerAs : 'resultCtrl'
      });
  });
