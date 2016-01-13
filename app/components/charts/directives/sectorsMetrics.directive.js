(function() {
  'use strict'

  /**
  * @module climbingMemoCharts
  * @name climbingMemoCharts.directive:sectorsMetrics
  * @description
  * # sectorsMetrics
  */
  angular.module('climbingMemo.charts')
  .directive('sectorsMetrics', sectorsMetricsDirective)

  sectorsMetricsDirective.$inject = []

  function sectorsMetricsDirective() {
    return {
      templateUrl: 'components/charts/views/_sectorsMetrics.html',
      restrict: 'E',
      scope: {
        metrics: '='
      },
      controller: function($scope, $uibModal) {
        /**
        * Open a modal to display routes details
        *
        * @method openRoutesModal
        * @param {Array} routes - routes of Id
        */
        $scope.openRoutesModal = function(routesId) {
          $uibModal.open({
            templateUrl: 'components/routes/views/sliderModal.html',
            controller: 'ModalsliderCtrl',
            size: 'md',
            resolve: {
              routesId: function() {
                return routesId
              }
            }
          })
        }
      }
    }
  }
// jscs:disable disallowSemicolons
})();
