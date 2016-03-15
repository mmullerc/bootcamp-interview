(function() {
'use strict';
  angular
    .module('interviewAppApp')
    .controller('HomeController', HomeController);

    function HomeController($state){

      var vm = this;

      vm.startTest = function(){
        $state.go('interviewee-info');
      }
    }

})();
