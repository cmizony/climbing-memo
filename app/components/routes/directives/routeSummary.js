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
      'RoutesUtilsSvc',
      'RoutesSvc',
      'utilsChartSvc'
    ]

    function routeSummaryDirective(RoutesUtilsSvc, RoutesSvc, utilsChartSvc) {
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

          /**
          * Create an array of size N
          *
          * @method getTimes
          * @param {Integer} n
          * @return {Array}
          */
          scope.getTimes = function(n) {
            return new Array(n || 0)
          }

          /**
          * Populate smart default values when a sector is selected
          *
          * @method sectorPopulatePlaceholder
          */
          scope.sectorPopulatePlaceholder = function() {
            var filteredArrayRoutes = scope.arrayRoutes.filter(function(n) {
              return n.sector === scope.route.sector
            })

            var properties = ['type','rock','location']

            for (var i=0 ; i < properties.length ; i++) {
              var property = properties[i]
              if (!scope.route.hasOwnProperty(property)) {
                scope.route[property] = utilsChartSvc.arrayGroupBy(filteredArrayRoutes,property)[0]
              }
            }
          }

          // Buffer for all routes
          scope.arrayRoutes = []

          RoutesSvc.getRoutes().then(function(data) {
            scope.arrayRoutes    = _.toArray(data)
            scope.locations = utilsChartSvc.arrayGroupBy(scope.arrayRoutes, 'location')
            scope.sectors = utilsChartSvc.arrayGroupBy(scope.arrayRoutes, 'sector')
          })

        }
      }
    }
    // jscs:disable disallowSemicolons
})();
