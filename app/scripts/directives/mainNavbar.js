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
      replace: true,
      templateUrl: 'views/_mainNavbar.html',
      controller: 'navbarCtrl'
    }
  }
// jscs:disable disallowSemicolons
})();
