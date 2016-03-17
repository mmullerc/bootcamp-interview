(function() {
'use strict';
  angular
    .module('interviewAppApp')
    .controller('HomeController', HomeController);

    function HomeController($state, auth){

      var vm = this;

      vm.startTest = function(){
        $state.go('interviewee-info');
      }
    }

})();
