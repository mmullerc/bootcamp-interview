(function(){
  angular
    .module('interviewAppApp')
    .service('auth', auth);

    function auth($window, $http){

      var saveToken = function(token){
        $window.localStorage['interview-token'] = token;
      }

      var getToken = function(){
        return $window.localStorage['interview-token'];
      }

      var login = function(user) {
          return $http.post('api/login', user).then(function(results) {
            saveToken(results.data.token);
          });
        };

      var logout = function() {
        $window.localStorage.removeItem('interview-token');
      };

      var isLoggedIn = function() {
        var token = getToken();
         if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));
           return payload.exp > Date.now() / 1000;
        } else {
          return false;
        }
      };

      var currentUser = function() {
          if(isLoggedIn()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
              email : payload.email,
              lastName : payload.lastName,
              name : payload.name
            };
        }
      };

      return {
        saveToken : saveToken,
        getToken : getToken,
        logout : logout,
        login : login,
        isLoggedIn : isLoggedIn,
        currentUser : currentUser
      }

    }
})();
