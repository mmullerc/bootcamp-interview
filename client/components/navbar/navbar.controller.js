(function(){

'use strict';

angular.module('interviewAppApp')
  .controller('NavbarController', NavbarController);

  function NavbarController(auth,$rootScope, $state){

    var vm = this;

    vm.isLoggedIn = auth.isLoggedIn();
    
    vm.logOut = function(){
      auth.logout();
      $rootScope.$broadcast('loggedOut');
      $state.go('login');
    }
  }

})();
