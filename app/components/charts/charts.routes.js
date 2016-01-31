(function() {
  'use strict'

  /**
  * @module climbingMemoCharts
  * @name climbingMemoCharts.app:Routes
  * @description
  * Routes for climbingMemoCharts app:
  * <ul>
  *   <li>`/charts` Data visualization for routes</li>
  * </ul>
  */
  angular.module('climbingMemo.charts')
  .config(function($routeProvider) {
    $routeProvider
    .when('/charts', {
      controller: 'chartsCtrl',
      templateUrl: 'components/charts/chartsLayout.html',
      controllerAs: 'chartsVm',
      resolve: {
        ResolvedRoutes: ['RoutesSvc', function(RoutesSvc) {
          return RoutesSvc.getRoutes()
        }]
      }
    })
  })
// jscs:disable disallowSemicolons
})();
