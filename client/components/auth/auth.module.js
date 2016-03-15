'use strict';

angular.module('interviewAppApp.auth', [
  'interviewAppApp.constants',
  'interviewAppApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
