'use strict';
(function() {

angular.module('interviewAppApp')
  .controller('QuestionsController', QuestionsController)
  .filter('offset', function() {
    return function (input, start) {
  		if (input) {
  			start = +start;
  			return input.slice(start);
  		}
  		return [];
  	};
  });

  function QuestionsController($state, techService, $stateParams, $modal, $rootScope, SweetAlert){

    var vm = this;

    vm.technology = $stateParams.technology;
    vm.currentPage = 1;
    vm.itemsPerPage = 3;
    vm.totalItems = vm.technology.questions.length;
    vm.pages = Math.ceil(vm.totalItems / vm.itemsPerPage);

    if(vm.technology == null || vm.technology == undefined){
      $state.go('technologies-crud');
    }

    vm.addNew = function () {
     var modalInstance = $modal.open({
       templateUrl: 'components/questions-modal/questions-modal.tpl.html',
       controller: 'QuestionModalController',
       controllerAs: 'questionModalCtrl',
       resolve: {
          technology: function () {
            return vm.technology;
          }
        }
      });
    }

    vm.deleteQuestion = function(question){

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
          var tech = {
            id : vm.technology._id,
            name : vm.technology.name,
            category : vm.technology.category,
            questions : question
          }

          techService.deleteQuestion(tech).then(function(results){
            vm.technology = results.data;
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
    };

    $rootScope.$on('questionAdded', function(event,results){
      vm.technology = results.data
    });

  }
})();
