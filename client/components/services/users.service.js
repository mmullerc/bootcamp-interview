//Categories service
(function(){

  angular
    .module('interviewAppApp')
    .factory('UserService',UserService);

  function UserService($http, auth) {

    var addUser = function(usr){
      return $http.post('api/register', usr,{
        headers: {
          Authorization: 'Bearer '+ auth.getToken()
        }
      });
    }

    var getUsers = function(){
      return $http.get('api/users');
    }

    var updateUser = function(usr){
      return $http.put('api/users', usr)
    }

    var deleteUser= function(usr){
      return $http.delete('api/users/'+usr._id+'');
    }

    return {
      addUser : addUser,
      deleteUser : deleteUser,
      updateUser : updateUser,
      getUsers : getUsers
    }
  };

})();
