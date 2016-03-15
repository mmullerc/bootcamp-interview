'use strict';

angular.module('interviewAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('technologies', {
        url: '/technologies',
        templateUrl: 'app/technologies/tech-categories.view.html',
        controller: 'TechTabsController',
        controllerAs: 'techTabsCtrl',
        params: {
         category: {
           squash: false
         }
       }
      })
      .state('technologies.tech-list', {
         url : '',
         views: {
           'tech-list@technologies': {
               templateUrl: 'app/technologies/technologies.view.html',
               controller: 'TechnologiesController',
               controllerAs:'techCtrl'
           }
         },
         params: {
          category: {
            squash: false
          }
        }
       })
      .state('technologies-crud', {
        url: '/technologies-crud',
        templateUrl: 'app/technologies/technologies-crud.view.html',
        controller: 'TechnologiesController',
        controllerAs: 'techCtrl'
      })
      .state('questions', {
        url: '/questions',
        templateUrl: 'app/technologies/tech-questions.view.html',
        controller: 'QuestionsController',
        controllerAs: 'questionsCtrl',
        params: {
         technology: {
           squash: false
         }
       }
      });
  });
