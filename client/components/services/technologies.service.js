//Technologies service
(function(){

  angular
    .module('interviewAppApp')
    .factory('techService',techService)

  function techService($http) {

    var addTech = function(tech){
      return $http.post('api/technologies', tech);
    }

    var addQuestion = function(tech){
      return $http.post('api/technologies/questions/'+tech._id+'', tech);
    }

    var getTechs = function(){
      return $http.get('api/technologies');
    }

    var getTechById = function(id){
      return $http.get('api/technologies/'+id+'');
    }

    var getTechsByCategory = function(id){
      return $http.get('api/technologies_by_category/'+id+'');
    }

    var updateTech = function(tech){
      return $http.put('api/technologies', tech)
    }

    var deleteTech= function(tech){
      return $http.delete('api/technologies/'+tech._id+'');
    }

    var deleteQuestion = function(tech){
      return $http.put('api/technologies/questions', tech);
    }


    return {
      addTech : addTech,
      addQuestion : addQuestion,
      getTechs : getTechs,
      deleteTech : deleteTech,
      updateTech : updateTech,
      getTechById : getTechById,
      deleteQuestion : deleteQuestion,
      getTechsByCategory : getTechsByCategory
    }
  };

})();
