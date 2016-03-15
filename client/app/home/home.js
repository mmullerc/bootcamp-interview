'use strict';

angular.module('interviewAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.view.html',
        controller: 'HomeController',
        controllerAs : 'homeCtrl'
      });
  });
