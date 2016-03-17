'use strict';
(function() {

angular.module('interviewAppApp')
  .controller('LoginController', LoginController);

  function LoginController($state, $location, auth, $rootScope){

    var vm = this;

    vm.login = function(){

      if(auth.isLoggedIn() == true){
        $rootScope.$broadcast('loggedIn');
        $state.go('home',{reload: true});
      }

      var credentials = {
        email : vm.email,
        password : vm.password
      }
      auth.login(credentials).then(function(results){
        if(auth.isLoggedIn() === true){
          $rootScope.$broadcast('loggedIn');
          $state.go('home');
        }
      });
    };
  }
})();
