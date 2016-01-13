(function() {
  'use strict'

  /**
  * @module climbingMemoCore
  * @name climbingMemoCore.directive:mainNavbar
  * @description
  * # mainNavbar
  * Directive of the climbingMemoCore
  */
  angular.module('climbingMemo.core')
  .directive('mainNavbar', mainNavbarDirective)

  mainNavbarDirective.$inject = []

  function mainNavbarDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'components/core/views/_mainNavbar.html',
      controller: 'navbarCtrl'
    }
  }
// jscs:disable disallowSemicolons
})();
