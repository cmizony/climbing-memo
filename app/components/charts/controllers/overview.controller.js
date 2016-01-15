(function() {
  'use strict'

  /**
  * @module climbingMemoCharts
  * @name climbingMemoCharts.controller:overviewCtrl
  * @description
  * # overviewCtrl
  * Controller of the climbingMemoCharts
  */
  angular.module('climbingMemo.charts')
  .controller('overviewCtrl', overviewController)

  overviewController.$inject = [
    '$scope',
    '$log',
    '$rootScope',
    'utilsChartSvc',
    'RoutesSvc'
  ]

  function overviewController($scope, $log, $rootScope, utilsChartSvc,
  RoutesSvc) {

    // Get Data
    RoutesSvc.getRoutes().then(function(data) {
      $scope.initController(data)
    })

    // Watch Update event
    $rootScope.$on('routesUpdated', function() {
      RoutesSvc.getRoutes().then(function(data) {
        $scope.initController(data)
      })
    })

    /**
    * Initialize Controller
    * @method initController
    * @param {Object} data
    */
    $scope.initController = function(data) {
      var arrayRoutes = _.toArray(data)
      var arraySectors = utilsChartSvc.arrayGroupBy(arrayRoutes,"sector")
      var arrayTypes = utilsChartSvc.arrayGroupBy(arrayRoutes,"type")

      $scope.routes = arrayRoutes
      $scope.metrics = {
        count: arrayRoutes.length,
        favoriteSector: arraySectors[0],
        favoriteType: arrayTypes[0]
      }
    }
  }
// jscs:disable disallowSemicolons
})();
