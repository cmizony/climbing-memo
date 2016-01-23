(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.directive:routeSummary
  * @description
  * Angular directive which represent summary of a
  * route display on a card
  */
  angular.module('climbingMemo.routes')
  .directive('routeSummary', routeSummaryDirective)

    routeSummaryDirective.$inject = [
      'RoutesUtilsSvc'
    ]

    function routeSummaryDirective(RoutesUtilsSvc) {
      return {
        restrict: 'E',
        scope: {
          route: '='
        },
        templateUrl: 'components/routes/views/_routeSummary.html',
        link: function(scope) {
          scope.getIconStatus  = RoutesUtilsSvc.getIconStatus
          scope.getIconRock    = RoutesUtilsSvc.getIconRock
          scope.getIndoorLabel = RoutesUtilsSvc.getIndoorLabel
          scope.getTypeColor   = RoutesUtilsSvc.getTypeColor
        }
      }
    }
// jscs:disable disallowSemicolons
})();
