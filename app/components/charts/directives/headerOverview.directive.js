(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.directive:headerOverview
  * @description
  * # headerOverview
  * Directive of the siuranaCharts
  * @example
  * <header-overview></header-overview>
  */
  angular.module('siurana.charts')
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
