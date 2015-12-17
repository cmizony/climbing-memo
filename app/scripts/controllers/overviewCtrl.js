(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.controller:overviewCtrl
  * @description
  * # overviewCtrl
  * Controller of the climbingMemo
  */
  angular.module('climbingMemo')
  .controller('overviewCtrl', overviewController)

  overviewController.$inject = [
    '$scope',
    '$localStorage',
    '$log',
    '$rootScope',
    'utilsChartSvc',
    'utilsRouteSvc'
  ]

  function overviewController($scope, $localStorage, $log,
  $rootScope, utilsChartSvc, utilsRouteSvc) {

    // Get Data
    utilsRouteSvc.getRoutes().then(function(data) {
      $scope.initController(data)
    })

    // Watch Update event
    $rootScope.$on('routesUpdated', function() {
      utilsRouteSvc.getRoutes().then(function(data) {
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
