(function(){
angular
	.module('interviewAppApp')
	.directive('questionsAndAnswers', questionsAndAnswers);

	function QuestionsAndAnswersController($scope, InterviewService){

		var vm = this;
    vm.show = false;
    vm.tech = vm.technology;
    vm.level = 'none';
    vm.questions = [];

    var basicQuestions = [],
    intermediateQuestions = [],
    advancedQuestions = [],
    expertQuestions = [];

    categorizeQuestions();

    function categorizeQuestions(){

      for (var i = 0; i < vm.tech.questions.length; i++) {

        if(vm.tech.questions[i].level == 'basic'){

          basicQuestions.push(vm.tech.questions[i]);

        }else if(vm.tech.questions[i].level == 'intermediate'){

          intermediateQuestions.push(vm.tech.questions[i]);

        }else if(vm.tech.questions[i].level == 'advanced'){

          advancedQuestions.push(vm.tech.questions[i]);

        }else if(vm.tech.questions[i].level == 'expert'){

          expertQuestions.push(vm.tech.questions[i]);
        }
      }
    }

    vm.showQuestions = function(){

      if(vm.level == 'none'){
        vm.show = false;
      }else{
        if(vm.level == 'basic'){
          vm.questions = basicQuestions;
        }else if(vm.level == 'intermediate'){
          vm.questions = intermediateQuestions;
        }else if(vm.level == 'advanced'){
          vm.questions = advancedQuestions;
        }else if(vm.level == 'expert'){
          vm.questions = expertQuestions;
        }
        vm.show = true;
      }

      var techLevel = {
        technology: vm.technology.name,
        level : vm.level
      }

      InterviewService.setSkillList(techLevel);
      
    }

    vm.hideQuestions = function(){
      vm.show = false;
    }

  }
	function questionsAndAnswers() {
	  return {
	    restrict: 'E',
	    templateUrl: 'components/questions/questionsAndAnswers.tpl.html',
	    scope: {
        technology : '='
	  },
		  bindToController: true,
		  controllerAs: 'questionsAnswersCtrl',
		  controller : QuestionsAndAnswersController
	  }
	}
})();
