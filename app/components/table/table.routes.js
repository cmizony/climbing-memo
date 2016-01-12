(function() {
  'use strict'

  /**
  * @module climbingMemoTable
  * @name climbingMemoTable.app:Routes
  * @description
  * Routes for climbingMemoTable app:
  * <ul>
  *   <li>`/table` Table view of routes</li>
  * </ul>
  */
  angular.module('climbingMemo.routes')
  .config(function($routeProvider) {
    $routeProvider
    .when('/table', {
      controller: 'tableCtrl',
      templateUrl: 'components/table/views/tableLayout.html',
      controllerAs: 'tableVm'
    })
  })
// jscs:disable disallowSemicolons
})();
