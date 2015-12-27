(function() {
  'use strict'

  /**
  * @module climbingMemoUsers
  * @name climbingMemoUsers.directive:userLogin
  * @description
  * # userLogin
  * Directive of the climbingMemoUsers
  */
  angular.module('climbingMemo.users')
  .directive('userLogin', userLoginDirective)

  userLoginDirective.$inject = []

  function userLoginDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/users/views/_userLogin.html'
    }
  }
// jscs:disable disallowSemicolons
})();
