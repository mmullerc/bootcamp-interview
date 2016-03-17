'use strict';
/**
 * @description Categories Router
 */
angular.module('interviewAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.view.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
      })
  });
