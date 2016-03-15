'use strict';
(function() {

angular.module('interviewAppApp')
  .controller('IntervieweeInfoController', IntervieweeInfoController);

  function IntervieweeInfoController($state, ValidationService, InterviewService){
    var vm = this;
    vm.interviewee = {};
    vm.interviewee.email = '';

    vm.readyInfo = function(){

      var allSpacesValid = true;

      if(ValidationService.checkEmptySpaces(vm.interviewee) === false){
        alert("All fields required");
        allSpacesValid = false;
      }
      if(ValidationService.validateEmail(vm.interviewee.email) === false){
        alert("Please enter a valid email");
        allSpacesValid = false;
      }

      if(allSpacesValid == true){

        InterviewService.setInterviewee(vm.interviewee);
        $state.go('technologies');
      }
    }

  }
})();
