(function(){
    'use strict';

    angular
      .module('interviewAppApp')
      .controller('TechModalController', TechModalController)

      function TechModalController($modalInstance, techParam, techService, CategoryService, $rootScope, SweetAlert){

        var vm = this;
        vm.techName;
        vm.categories;
        var editing;
        vm.category = {};
        listCategories();

        if(techParam){
          editing = true;
          vm.technology = techParam;
          vm.category.selected = techParam.category;
        }

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

        vm.modalAccept = function(){

          if(editing == true){

            vm.technology.category = vm.category.selected;

            techService.updateTech(vm.technology).then(function(results){
              $rootScope.$broadcast('updatedTechnology');
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

            var technology = {
              name : vm.technology.name,
              category : vm.category.selected
            }
            console.log(technology);
            techService.addTech(technology).then(function(results){
              $rootScope.$broadcast('addedTechnology');
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
        };
      }
})()
