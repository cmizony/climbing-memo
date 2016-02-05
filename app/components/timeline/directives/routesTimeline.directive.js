(function() {
  'use strict'

  /**
  * @module siuranaTimeline
  * @name siuranaTimeline.directive:routesTimeline
  * @description
  * # routesTimeline
  */
  angular.module('siurana.timeline')
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
