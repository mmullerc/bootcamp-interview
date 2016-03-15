//Categories service
(function(){

  angular
    .module('interviewAppApp')
    .factory('InterviewService',InterviewService)

  function InterviewService($http) {

    var interviewee;
    var techSkillList = [];

    var setInterviewee = function(param){
      interviewee = param;
    }

    var setSkillList = function(techLevel){

      for (var i = 0; i < techSkillList.length; i++) {
        if(techSkillList[i].technology == techLevel.technology){
          techSkillList.splice(i,1);
        }
      }
      techSkillList.push(techLevel);
    }

    var finishTest = function(englishLevel, techComment){

      var testResults = {
        name : interviewee.name,
        lastName : interviewee.lastName,
        identification : interviewee.id,
        phoneNumber : interviewee.phoneNumber,
        email : interviewee.email,
        placeOfStudy : interviewee.placeOfStudy,
        studyLevel : interviewee.studyLevel,
        technicalSkills : techSkillList,
        englishLevel : englishLevel,
        technicalComment : techComment
      }

      return $http.post('api/testResults', testResults);
    }

    return {
      setInterviewee : setInterviewee,
      setSkillList : setSkillList,
      finishTest : finishTest
    }

  };
})();
