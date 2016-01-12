(function() {
  'use strict'

  /**
  * @module climbingMemoMap
  * @name climbingMemoMap.app:Routes
  * @description
  * Routes for climbingMemoMap app:
  * <ul>
  *   <li>`/maps` Google map view for sectors</li>
  * </ul>
  */
  angular.module('climbingMemo.map')
  .config(function($routeProvider) {
    $routeProvider
    .when('/map', {
      controller: 'mapCtrl',
      templateUrl: 'components/map/views/mapLayout.html',
      controllerAs: 'mapVm'
    })
  })
// jscs:disable disallowSemicolons
})();
