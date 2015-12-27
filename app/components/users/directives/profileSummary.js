(function() {
  'use strict'

  /**
  * @module climbingMemoUsers
  * @name climbingMemoUsers.directive:profileSummary
  * @description
  * # profileSummary
  * Directive of the climbingMemoUsers
  */
  angular.module('climbingMemo.users')
  .directive('profileSummary', profileSummaryDirective)

  profileSummaryDirective.$inject = []

  function profileSummaryDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/users/views/_profileSummary.html'
    }
  }
// jscs:disable disallowSemicolons
})();
