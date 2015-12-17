(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.directive:mainNavbar
  * @description
  * # mainNavbar
  * Directive of the climbingMemo
  */
  angular.module('climbingMemo')
  .directive('mainNavbar', mainNavbarDirective)

  mainNavbarDirective.$inject = []

  function mainNavbarDirective() {
    return {
      restrict: 'E',
      templateUrl: 'views/_mainNavbar.html'
    }
  }
// jscs:disable disallowSemicolons
})();
