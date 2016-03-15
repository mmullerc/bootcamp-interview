'use strict';
(function() {

angular.module('interviewAppApp')
  .controller('TechTabsController', TechTabsController);

  function TechTabsController($state, CategoryService, $mdSidenav){

    var vm = this;

    CategoryService.getCategories().then(function(results){
      vm.categories = results.data;
    });
  }
})();
