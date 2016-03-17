'use strict';
(function() {

angular.module('interviewAppApp')
  .controller('MainController', MainController);

  function MainController($state, UserService, auth, $rootScope){

    var vm = this;

    function displayComponents(){
      vm.showNav = auth.isLoggedIn();
      vm.showFooter = auth.isLoggedIn();
    }

    function hideComponents(){
      vm.showNav = auth.isLoggedIn();
      vm.showFooter = auth.isLoggedIn();;
    }

    $rootScope.$on('loggedIn', function(){
      displayComponents();
    });

    $rootScope.$on('loggedOut', function(){
      hideComponents();
    });

    if(auth.isLoggedIn() == true){
      $state.go('home');
      displayComponents();
    }else{
      setTimeout(function () {
        hideComponents();
        $state.go('login');
      }, 100);
    }

  }
})();
