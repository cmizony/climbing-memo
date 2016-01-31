(function() {
  'use strict'

  /**
  * @module climbingMemoCharts
  * @name climbingMemoCharts.directive:gridCharts
  * @description
  * # gridCharts
  */
  angular.module('climbingMemo.charts')
  .directive('gridCharts', gridChartsDirective)

  gridChartsDirective.$inject = [
  ]

  function gridChartsDirective() {
    return {
      templateUrl: 'components/charts/views/_gridCharts.html',
      restrict: 'E',
      scope: {
        routes: '='
      }
    }
  }
// jscs:disable disallowSemicolons
})();
