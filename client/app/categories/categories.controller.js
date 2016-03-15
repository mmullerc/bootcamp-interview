'use strict';
(function() {

angular.module('interviewAppApp')
  .controller('CategoriesController', CategoriesController);

  /**
   * @name CategoriesController
   * @description Its the main category controller
   * @param Service $state UI router $state service
   * @param Service $modal bootstrap UI modal service
   * @param Service CategoryService provides $http services
   * @param $rootScope angularjs rootScope
   * @param Service SweetAlert Its a third party service that provides custom alerts
   */
  function CategoriesController($state, $modal, CategoryService, $rootScope, SweetAlert){

    var vm = this;
    listCategories();

    /**
     * @name listCategories
     * @description Lists the categories provided by the CategoryService
     */
    function listCategories(){
      CategoryService.getCategories().then(function(results){
        vm.categories = results.data;
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
    * @name addNew
    * @description Instantiates a modal so we can add a new category
    */
    vm.addNew = function () {
     var cat = ''
     var modalInstance = $modal.open({
       templateUrl: 'components/categories-modal/categories.tpl.html',
       controller: 'CategoriesModalController',
       controllerAs: 'categoryModalCtrl',
       resolve : { // This fires up before controller loads and templates rendered
          categoryParam : function() {
             return cat;
          }
        }
     });
    }
    /**
     * @name updateCategory
     * @description Instantiates a modal so we can update a category
     * @param  Category cat Its the category we want to update
     */
    vm.updateCategory = function (cat) {
     var modalInstance = $modal.open({
       templateUrl: 'components/categories-modal/categories.tpl.html',
       controller: 'CategoriesModalController',
       controllerAs: 'categoryModalCtrl',
       resolve : { // This fires up before controller loads and templates rendered
          categoryParam : function() {
             return cat;
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
    vm.deleteCategory = function(cat){

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
          CategoryService.deleteCategory(cat).then(function(results){
            listCategories();
            console.log(results);
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
    $rootScope.$on('addedCategory', function(){
      listCategories();
    });
    /**
     * $on when a category is updated by the
     * modal, we update the list of categories in
     * the main category controller
     * @param  Event 'updatedCategory' - Its an event fired by the modal controller
     */
    $rootScope.$on('updatedCategory', function(){
      listCategories();
    });
  }
})();
