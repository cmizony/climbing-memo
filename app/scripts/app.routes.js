(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.app:Routes
  * @description
  * Routes for climbingMemo app:
  * <ul>
  *   <li>`/table` Table view of routes</li>
  *   <li>`/timeline` Timeline view of routes</li>
  *   <li>`/maps` Google map view for sectors</li>
  *   <li>`/charts` Data visualization for routes</li>
  * </ul>
  * Default route is `/timeline`
  */
  angular.module('climbingMemo')
  .config(function($routeProvider) {
    $routeProvider
    .when('/', {
      redirectTo: '/timeline'
    })
    .when('/table', {
      controller: 'tableCtrl',
      templateUrl: 'views/table.html',
      controllerAs: 'tableVm'
    })
    .when('/timeline', {
      controller: 'TimelineCtrl',
      templateUrl: 'views/timeline.html',
      controllerAs: 'timelineVm'
    })
    .when('/map', {
      controller: 'mapCtrl',
      templateUrl: 'views/map.html',
      controllerAs: 'mapVm'
    })
    .otherwise({
      redirectTo: '/timeline'
    })
  })
// jscs:disable disallowSemicolons
})();
