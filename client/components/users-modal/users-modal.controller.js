(function(){
    'use strict';

    angular
      .module('interviewAppApp')
      .controller('UsersModalController', UsersModalController)

      function UsersModalController($modalInstance, userParam, UserService, $rootScope, SweetAlert){

        var vm = this;
        var editing;

        if(userParam){
          editing = true;
          vm.user = userParam;
        }

        /**
         * @name modalAccept
         * if editing == true then the category gets UPDATED,
         * else a NEW category is created.
         */
        vm.modalAccept = function(){

          if(editing == true){
            UserService.updateUser(vm.user).then(function(results){
              $rootScope.$broadcast('updatedUser');
            }).catch(function(err){
              SweetAlert.swal({title: 'Error!',
              text: err.statusText,
              type: 'warning',
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'Accept',
              closeOnConfirm: true});
            });
            $modalInstance.close();

          }else{
          UserService.addUser(vm.user).then(function(results){
            $rootScope.$broadcast('addedUser');
          }).catch(function(err){
            SweetAlert.swal({title: 'Error!',
            text: err.statusText,
            type: 'warning',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Accept',
            closeOnConfirm: true});
          });
          $modalInstance.close();

          }
        }
      }
})()
