(function() {
  'use strict'

  /**
  * @module climbingMemoCharts
  * @name climbingMemoCharts.controller:chartsCtrl
  * @description
  * # chartsCtrl
  * Controller of the climbingMemoCharts
  */
  angular.module('climbingMemo.charts')
  .controller('chartsCtrl', chartsController)

  chartsController.$inject = [
    '$rootScope',
    'utilsRouteSvc'
  ]

  function chartsController($rootScope, utilsRouteSvc) {
    /* jshint validthis:true */
    var vm = this

    // Get Data
    utilsRouteSvc.getRoutes().then(function(data) {
      vm.initController(data)
    })

    // Watch Update event
    $rootScope.$on('routesUpdated', function() {
      utilsRouteSvc.getRoutes().then(function(data) {
        vm.initController(data)
      })
    })

    /**
    * Initialize controller
    *
    * @method initController
    * @param {Object} data
    */
    vm.initController = function(data) {
      vm.routes = _.toArray(data)
    }
  }
// jscs:disable disallowSemicolons
})();
