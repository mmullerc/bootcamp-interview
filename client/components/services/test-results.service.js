//Categories service
(function(){

  angular
    .module('interviewAppApp')
    .factory('TestResultsService',TestResultsService)

  function TestResultsService($http) {

    var getTests = function(){
      return $http.get('api/testResults');
    }

    var generateTestResultsPDF = function(test){
        return $http.post('api/testResults/generatePDF',test);
    }

    var delteTest = function(test){
      return $http.delete('api/testResults/'+test._id+'');
    }

    return {
      getTests : getTests,
      generateTestResultsPDF : generateTestResultsPDF,
      delteTest : delteTest
    }
  };

})();
