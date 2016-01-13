(function() {
  'use strict'

  /**
  * @module climbingMemoCore
  * @name climbingMemoCore.controller:navbarCtrl
  * @description
  * # navbarCtrl
  * Controller of the climbingMemoCore
  */
  angular.module('climbingMemo.core')
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
