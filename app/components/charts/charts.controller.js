(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.controller:chartsCtrl
  * @description
  * # chartsCtrl
  * Controller of the siuranaCharts
  */
  angular.module('siurana.charts')
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
