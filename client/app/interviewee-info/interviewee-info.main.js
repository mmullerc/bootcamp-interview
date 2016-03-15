'use strict';

angular.module('interviewAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('interviewee-info', {
        url: '/interviewee-info',
        templateUrl: 'app/interviewee-info/interviewee-info.view.html',
        controller: 'IntervieweeInfoController',
        controllerAs: 'intervieweeInfoCtrl'
      });
  });
