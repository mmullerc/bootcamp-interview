'use strict';

angular.module('interviewAppApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('comments', {
        url: '/comments',
        templateUrl: 'app/Comments/comments.view.html',
        controller: 'CommentsController',
        controllerAs : 'commentsCtrl'
      });
  });
