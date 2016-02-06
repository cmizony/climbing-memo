(function() {
  'use strict'

  /**
  * @module siuranaCore
  * @name siuranaCore.controller:navbarCtrl
  * @description
  * # navbarCtrl
  * Controller of the siuranaCore
  */
  angular.module('siurana.core')
  .controller('navbarCtrl', navbarController)

  navbarController.$inject = [
    '$scope',
    '$location',
    'Auth'
  ]

  function navbarController($scope, $location, Auth) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path()
    }

    $scope.isLoggedIn = Auth.isLoggedIn
  }
// jscs:disable disallowSemicolons
})();
