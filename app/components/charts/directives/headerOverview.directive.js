(function() {
  'use strict'

  /**
  * @module climbingMemoCharts
  * @name climbingMemoCharts.directive:headerOverview
  * @description
  * # headerOverview
  * Directive of the climbingMemoCharts
  * @example
  * <header-overview></header-overview>
  */
  angular.module('climbingMemo.charts')
  .directive('headerOverview', headerOverviewDirective)

  headerOverviewDirective.$inject = []

  function headerOverviewDirective() {
    return {
      scope: true,
      restrict: 'E',
      templateUrl: 'components/charts/views/_headerOverview.html',
      controller: 'overviewCtrl'
    }
  }
// jscs:disable disallowSemicolons
})();
