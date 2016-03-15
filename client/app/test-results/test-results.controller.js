'use strict';
(function() {

angular.module('interviewAppApp')
  .controller('TestResultsController', TestResultsController);

  function TestResultsController($state, TestResultsService, $http){

    var vm = this;
    listTests();

    function listTests(){

      TestResultsService.getTests().then(function(results){
        console.log(results);
        vm.tests = results.data;
      }).catch(function(err){
        console.log(err);
      })
    }

    vm.deleteTest = function(test){

      TestResultsService.deleteTest(test).then(function(results){
        console.log(results);
        listTests();
      }).catch(function(err){
        console.log(err);
      });

    }

    vm.generatePDF = function(test){
    $http.post('/api/testResults/generatePDF',test, {responseType: 'arraybuffer'})
     .success(function (data) {
         var file = new Blob([data], {type: 'application/pdf'});
         var fileURL = URL.createObjectURL(file);
         window.open(fileURL);
       });
    }
  }
})();
