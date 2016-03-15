(function(){
    'use strict';

    angular
      .module('interviewAppApp')
      .controller('CategoriesModalController', CategoriesModalController)

      /**
       * @name Categories Modal Controller,
       *  Controlls the methods of the modal.
       * @param $modalInstance - Instance of bootstrapui modal
       * @param Category categoryParam - Its the category that needs to be updated
       * @param Service CategoryService - Provides the http calls to the server - needed by the Categories
       * @param $rootScope - angular rootScope
       */
      function CategoriesModalController($modalInstance, categoryParam, CategoryService, $rootScope, SweetAlert){

        var vm = this;
        var editing;

        if(categoryParam){
          editing = true;
          vm.category = categoryParam;
        }

        /**
         * @name modalAccept
         * if editing == true then the category gets UPDATED,
         * else a NEW category is created.
         */
        vm.modalAccept = function(){

          if(editing == true){
            CategoryService.updateCategory(vm.category).then(function(results){
              $rootScope.$broadcast('updatedCategory');
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

              var category = {
                category : vm.category
              }
              CategoryService.addCategory(category).then(function(results){
                console.log(results);
                $rootScope.$broadcast('addedCategory');
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
