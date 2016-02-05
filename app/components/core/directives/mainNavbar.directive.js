(function() {
  'use strict'

  /**
  * @module siuranaCore
  * @name siuranaCore.directive:mainNavbar
  * @description
  * # mainNavbar
  * Directive of the siuranaCore
  */
  angular.module('siurana.core')
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
