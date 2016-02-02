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
    'RoutesSvc',
    'ResolvedRoutes'
  ]

  function chartsController(RoutesSvc, ResolvedRoutes) {
    /* jshint validthis:true */
    var vm = this

    /**
    * Initialize controller
    *
    * @method initController
    * @param {Object} data
    */
    vm.initController = function(data) {
      vm.routes = _.toArray(data)
    }

    vm.initController(ResolvedRoutes)
    RoutesSvc.subscribeForUpdates(vm.initController)
  }
// jscs:disable disallowSemicolons
})();
