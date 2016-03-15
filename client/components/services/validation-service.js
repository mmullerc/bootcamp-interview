//Validation service
(function(){

  angular
    .module('interviewAppApp')
    .factory('ValidationService',ValidationService)

  function ValidationService() {

    function checkEmptySpaces(param){

        var isCorrect = true;

        if(!param){
          return false;
        }

          if(param.name === '' || param.name === undefined){
            isCorrect = false;
          }
          if(param.lastName === '' || param.lastName === undefined){
            isCorrect = false;
          }
          if(param.id === '' || param.id === undefined){
            isCorrect = false;
          }
          if(param.email === '' || param.email === undefined){
            isCorrect = false;
          }
          if(param.phoneNumber === '' || param.phoneNumber === undefined){
            isCorrect = false;
          }
          if(param.placeOfStudy === '' || param.placeOfStudy === undefined){
            isCorrect = false;
          }
          if(param.studyLevel === '' || param.studyLevel === undefined){
            isCorrect = false;
          }

      return isCorrect;
    }

    function validateEmail(email) {

      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    function checkEnglishLevel(param){
      if(!param){
        return false;
      }
        if (param == '' || param == undefined) {
          return false;
        }else {
          return true;
        }
    }

    return {
      checkEmptySpaces: checkEmptySpaces,
      validateEmail: validateEmail,
      checkEnglishLevel : checkEnglishLevel
    }

  };
})();
