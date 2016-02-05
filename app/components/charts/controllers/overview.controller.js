(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.controller:overviewCtrl
  * @description
  * # overviewCtrl
  * Controller of the siuranaCharts
  */
  angular.module('siurana.charts')
  .controller('overviewCtrl', overviewController)

  overviewController.$inject = [
    '$scope',
    '$log',
    'utilsChartSvc',
    'RoutesSvc'
  ]

  function overviewController($scope, $log, utilsChartSvc, RoutesSvc) {

    // Get Data
    RoutesSvc.getRoutes().then(function(data) {
      $scope.initController(data)
      RoutesSvc.subscribeForUpdates($scope.initController)
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
