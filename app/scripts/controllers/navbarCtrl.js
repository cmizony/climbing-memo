(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.controller:navbarCtrl
  * @description
  * # navbarCtrl
  * Controller of the climbingMemo
  */
  angular.module('climbingMemo')
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
