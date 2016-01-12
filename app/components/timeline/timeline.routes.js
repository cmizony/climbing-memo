(function() {
  'use strict'

  /**
  * @module climbingMemoTimeline
  * @name climbingMemoTimeline.app:Routes
  * @description
  * Routes for climbingMemoTimeline app:
  * <ul>
  *   <li>`/timeline` Timeline view of routes</li>
  * </ul>
  */
  angular.module('climbingMemo.timeline')
  .config(function($routeProvider) {
    $routeProvider
    .when('/timeline', {
      controller: 'TimelineCtrl',
      templateUrl: 'components/timeline/views/timelineLayout.html',
      controllerAs: 'timelineVm'
    })
  })
// jscs:disable disallowSemicolons
})();
