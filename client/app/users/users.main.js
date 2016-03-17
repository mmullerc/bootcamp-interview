'use strict';
/**
 * @description Categories Router
 */
angular.module('interviewAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: 'app/users/users.view.html',
        controller: 'UsersController',
        controllerAs: 'usersCtrl'
      })
  });
