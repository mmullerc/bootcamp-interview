(function(){
    'use strict';

    angular
      .module('interviewAppApp')
      .controller('QuestionModalController', QuestionModalController)

      function QuestionModalController($modalInstance, technology, techService, $rootScope){

        var vm = this;

        vm.addQuestion = function(){

          technology.questions = {
            question : vm.question,
            answer : vm.answer,
            level : vm.level
          }

          techService.addQuestion(technology).then(function(results){
            $rootScope.$broadcast('questionAdded', results);
          }).catch(function(err){
            SweetAlert.swal({title: 'Error!',
            text: err.statusText,
            type: 'warning',
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Accept',
            closeOnConfirm: true});
          })
          $modalInstance.close();
        }

      }


})()
