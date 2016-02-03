(function() {
  'use strict'

  /**
  * @module climbingMemoTimeline
  * @name climbingMemoTimeline.directive:routesTimeline
  * @description
  * # routesTimeline
  */
  angular.module('climbingMemo.timeline')
  .directive('routesTimeline', routesTimelineDirective)

  routesTimelineDirective.$inject = [
  ]

  function routesTimelineDirective() {
    return {
      templateUrl: 'components/timeline/views/_routesTimeline.html',
      restrict: 'E',
      replace: true
    }
  }
// jscs:disable disallowSemicolons
})();
