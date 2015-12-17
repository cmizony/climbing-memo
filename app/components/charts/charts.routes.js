(function() {
  'use strict'

  /**
  * @module climbingMemo.charts
  * @name climbingMemo.charts.app:Routes
  * @description
  * Routes for climbingMemo.charts app:
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
      controllerAs: 'chartsVm'
    })
  })
// jscs:disable disallowSemicolons
})();
