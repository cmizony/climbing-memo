(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.directive:gridCharts
  * @description
  * # gridCharts
  */
  angular.module('siurana.charts')
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
