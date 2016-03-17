'use strict';

angular.module('interviewAppApp')
  .directive('footer', function() {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      controller: 'FooterController',
      controllerAs: 'footerCtrl',
      link: function(scope, element) {
        element.addClass('footer');
      }
    };
  })
  .controller('FooterController', FooterController);

  function FooterController(auth){

    var vm = this;
  }
