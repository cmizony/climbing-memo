(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.controller:chartsCtrl
  * @description
  * # chartsCtrl
  * Controller of the climbingMemo
  */
  angular.module('climbingMemo')
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
})()
