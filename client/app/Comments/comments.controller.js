(function() {
'use strict';
  angular
    .module('interviewAppApp')
    .controller('CommentsController', CommentsController);

    function CommentsController($state, ValidationService, InterviewService){

      var vm = this;

      vm.finishTest = function(){

        console.log('hola');

        if (ValidationService.checkEnglishLevel(vm.englishLevel)) {

          InterviewService.finishTest(vm.englishLevel, vm.technicalComment).then(function(results){
            console.log(results);
          }).catch(function(err){
            console.log(err);
          });

        }else{
          alert('Please enter an english level');
        }

      }

      // vm.startTest = function(){
      //   $state.go('interviewee-info');
      // }
    }

})();
