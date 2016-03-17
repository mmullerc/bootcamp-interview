'use strict';
(function() {

angular.module('interviewAppApp')
  .controller('TestResultsController', TestResultsController)
  .filter('offset', function() {
    return function (input, start) {
  		if (input) {
  			start = +start;
  			return input.slice(start);
  		}
  		return [];
  	};
  });

  function TestResultsController($state, TestResultsService, $http, $filter){

    var vm = this;
    listTests();
    vm.currentPage = 1;
    vm.itemsPerPage = 5;

    function listTests(){

      TestResultsService.getTests().then(function(results){
        vm.tests = results.data;
        setPagination();
      }).catch(function(err){
        console.log(err);
      })
    }

    /**
     * [setPagination description]
     */
    function setPagination(){
      vm.totalItems = vm.tests.length;
      vm.pages = Math.ceil(vm.totalItems / vm.itemsPerPage);
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
