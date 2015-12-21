(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.directive:sectorsMetrics
  * @description
  * # sectorsMetrics
  */
  angular.module('climbingMemo')
  .directive('sectorsMetrics', sectorsMetricsDirective)

  sectorsMetricsDirective.$inject = []

  function sectorsMetricsDirective() {
    return {
      templateUrl: 'views/_sectorsMetrics.html',
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
            templateUrl: 'views/sliderModal.html',
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
