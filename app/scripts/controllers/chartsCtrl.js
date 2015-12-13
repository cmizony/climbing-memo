'use strict'

/**
* @module climbingMemo
* @name climbingMemo.controller:chartsCtrl
* @description
* # chartsCtrl
* Controller of the climbingMemo
*/
angular.module('climbingMemo')
.controller('chartsCtrl', function($scope, $rootScope, utilsRouteSvc) {

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
  * Initialize controller
  *
  * @method initController
  * @param {Object} data
  */
  $scope.initController = function(data) {
    $scope.routes = _.toArray(data)
  }
})
