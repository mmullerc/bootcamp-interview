'use strict';
(function() {

angular
  .module('interviewAppApp')
  .controller('TechnologiesController', TechnologiesController)
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
   * @name TechnologiesController
   * @description Its the main technology controller
   * @param Service $state UI router $state service
   * @param Service $modal bootstrap UI modal service
   * @param Service techService provides $http services
   * @param $rootScope angularjs rootScope
   * @param Service SweetAlert Its a third party service that provides custom alerts
   */

  function TechnologiesController($state, techService, $modal, $stateParams, SweetAlert, $rootScope, $scope, $filter){

  var vm = this;
  vm.category = $stateParams.category;
  listTechnologies();
  vm.show = false;
  vm.level = 'none';
  vm.currentPage = 1;
  vm.itemsPerPage = 5;

  vm.ContinueTest = function(){
    $state.go('comments');
  }
  vm.setPage = function (pageNo) {
   vm.currentPage = pageNo;
 };


  /**
   * @name listTechnologies
   * @description Lists the technologies provided by the techService
   * if the category is present, then this function lists the technologies
   * by category
   */
  function listTechnologies(){

    if(vm.category){
      techService.getTechsByCategory(vm.category._id).then(function(results){
        vm.technologies = results.data;
      }).catch(function(err){
        SweetAlert.swal({title: 'Error!',
        text: err.statusText,
        type: 'warning',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Accept',
        closeOnConfirm: true});
      });
    }else{
      techService.getTechs().then(function(results){
        vm.technologies = results.data;
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
  }

  function setPagination(){
    vm.totalItems = vm.technologies.length;
    vm.pages = Math.ceil(vm.totalItems / vm.itemsPerPage);
  }
  /**
   * @name addNew
   * @description Instantiates the modal so we can create a new Technology
   */
  vm.addNew = function() {
   var tech ='';
   var modalInstance = $modal.open({
     templateUrl: 'components/tech-modal/tech-modal.tpl.html',
     controller: 'TechModalController',
     controllerAs: 'techModalCtrl',
     resolve : { // This fires up before controller loads and templates rendered
        techParam : function() {
           return tech;
        }
      }
    });
   }

   /**
    * @name editTech
    * @description Instantiates the modal so we can update a given Technology
    */
   vm.editTech = function(tech) {
    var modalInstance = $modal.open({
      templateUrl: 'components/tech-modal/tech-modal.tpl.html',
      controller: 'TechModalController',
      controllerAs: 'techModalCtrl',
      resolve : { // This fires up before controller loads and templates rendered
         techParam : function() {
            return tech;
         }
       }
     });
    }

    /**
     * @name deleteTech
     * @description Sends the techService the
     * object that we want to eliminate
     * @param Technology tech Its the object we want to eliminate
     */
    vm.deleteTech = function(tech){

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
          techService.deleteTech(tech).then(function(results){
            listTechnologies();
          }).catch(function(err){
            SweetAlert.swal({title: 'Error!',
            text: err.statusText,
            type: 'warning',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Accept',
            closeOnConfirm: true});
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
    $rootScope.$on('addedTechnology', function(){
      listTechnologies();
    });
    /**
     * $on when a category is updated by the
     * modal, we update the list of categories in
     * the main category controller
     * @param  Event 'updatedCategory' - Its an event fired by the modal controller
     */
    $rootScope.$on('updatedTechnology', function(){
      listTechnologies();
    });

  }
})();
