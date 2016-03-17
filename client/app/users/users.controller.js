'use strict';
(function() {

angular.module('interviewAppApp')
  .controller('UsersController', UsersController)
  .filter('offset', function() {
    return function (input, start) {
  		if (input) {
  			start = +start;
  			return input.slice(start);
  		}
  		return [];
  	};
  });

  /**
   * @name CategoriesController
   * @description Its the main category controller
   * @param Service $state UI router $state service
   * @param Service $modal bootstrap UI modal service
   * @param Service CategoryService provides $http services
   * @param $rootScope angularjs rootScope
   * @param Service SweetAlert Its a third party service that provides custom alerts
   */
  function UsersController($state, $modal, CategoryService, $rootScope, SweetAlert, $filter, UserService){

    var vm = this;
    listUsers();
    vm.currentPage = 1;
    vm.itemsPerPage = 5;

    function listUsers(){
      UserService.getUsers().then(function(results){
        vm.users = results.data;
        setPagination()
      }).catch(function(err){
        SweetAlert.swal({title: 'Error!',
        text: err.statusText,
        type: 'warning',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Accept',
        closeOnConfirm: true});
      });
    }

    /**
     * [setPagination description]
     */
    function setPagination(){
      vm.totalItems = vm.users.length;
      vm.pages = Math.ceil(vm.totalItems / vm.itemsPerPage);
    }

    /**
    * @name addNew
    * @description Instantiates a modal so we can add a new category
    */
    vm.addNew = function () {
     var usr = ''
     var modalInstance = $modal.open({
       templateUrl: 'components/users-modal/users-modal.tpl.html',
       controller: 'UsersModalController',
       controllerAs: 'usersModalCtrl',
       resolve : { // This fires up before controller loads and templates rendered
          userParam : function() {
             return usr;
          }
        }
     });
    }
    /**
     * @name updateCategory
     * @description Instantiates a modal so we can update a category
     * @param  Category cat Its the category we want to update
     */
    vm.updateUser = function (cat) {
      var modalInstance = $modal.open({
        templateUrl: 'components/users-modal/users.tpl.html',
        controller: 'UsersModalController',
        controllerAs: 'usersModalCtrl',
        resolve : { // This fires up before controller loads and templates rendered
           userParam : function() {
              return usr;
           }
         }
      });
    }
    /**
     * @name deleteCategory
     * @description Deletes a category
     * @param  Category cat Its the category that needs
     * to be deleted.
     */
    vm.deleteUser = function(user){

      SweetAlert.swal({title: 'Are you sure you want to delete this item?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Accept',
      cancelButtonText: 'Cancel',
      closeOnConfirm: true,
      closeOnCancel: true },
      function(isConfirm){
        if (isConfirm) {
          UserService.deleteUser(user).then(function(results){
            listUsers();
          }).catch(function(err){
            console.log(err);
          });
        }
      });
    }

    /**
     * $on when a new category is added by the
     * modal, we update the list of categories in
     * the main category controller
     * @param  Event 'addedCategory' - Its an event fired by the modal controller
     */
    $rootScope.$on('addedUser', function(){
      listUsers();
    });
    /**
     * $on when a category is updated by the
     * modal, we update the list of categories in
     * the main category controller
     * @param  Event 'updatedCategory' - Its an event fired by the modal controller
     */
    $rootScope.$on('updatedUser', function(){
      listUsers();
    });
  }
})();
