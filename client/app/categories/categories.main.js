'use strict';
/**
 * @description Categories Router
 */
angular.module('interviewAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('categories', {
        url: '/categories',
        templateUrl: 'app/categories/categories.view.html',
        controller: 'CategoriesController',
        controllerAs: 'categoriesCtrl'
      })
  });
