//Categories service
(function(){

  angular
    .module('interviewAppApp')
    .factory('CategoryService',CategoryService)

  function CategoryService($http) {

    var addCategory = function(cat){
      return $http.post('api/categories', cat);
    }

    var getCategories = function(){
      return $http.get('api/categories');
    }

    var updateCategory = function(cat){
      return $http.put('api/categories', cat)
    }

    var deleteCategory= function(cat){
      return $http.delete('api/categories/'+cat._id+'');
    }

    return {
      addCategory : addCategory,
      deleteCategory : deleteCategory,
      updateCategory : updateCategory,
      getCategories : getCategories
    }
  };

})();
