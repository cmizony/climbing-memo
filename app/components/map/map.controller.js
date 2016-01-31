(function() {
  'use strict'

  /**
  * @module climbingMemoMap
  * @name climbingMemoMap.controller:mapCtrl
  * @description
  * # mapCtrl
  * Controller of the climbingMemoMap
  */
  angular.module('climbingMemo.map')
  .controller('mapCtrl', mapController)

  mapController.$inject = [
    '$log',
    '$rootScope',
    'mapChartSvc',
    'RoutesSvc',
    'ResolvedRoutes'
  ]

  function mapController($log, $rootScope, mapChartSvc,
  RoutesSvc, ResolvedRoutes) {
    /* jshint validthis:true */
    var vm = this

    /**
    * Initialize map controller
    *
    * @method initController
    * @param {Object} routes
    */
    vm.initController = function(routes) {
      vm.offline = !$rootScope.online

      var arrayRoutes = _.toArray(routes)
      var arrayLocations = mapChartSvc.processData(arrayRoutes)

      _.map(arrayLocations, function(site) {
        site.options = {
          icon: 'images/' + vm.getMarkerIcon(site.metrics[0].type)
        }
        return site
      })

      vm.locations = arrayLocations
      vm.map = { center: { latitude: 37.7833, longitude: -122.4167 }, zoom: 8 }
    }

    /**
    * Get marker icon based on route type
    *
    * @method getMarkerIcon
    * @param {String} type
    * @return {String}
    */
    vm.getMarkerIcon = function(type) {
      var markerIcon = ''

      switch (type) {
        case 'Sport lead':   markerIcon = 'climbing_yellow.png' ; break
        case 'Boulder':      markerIcon = 'climbing_blue.png'   ; break
        case 'Traditional':  markerIcon = 'climbing_green.png'  ; break
        case 'Multi-pitch':  markerIcon = 'climbing_orange.png' ; break
        case 'Top rope':     markerIcon = 'climbing_gray.png'   ; break
        default:             markerIcon = 'climbing_gray.png'   ; break
      }
      return markerIcon
    }

    vm.initController(ResolvedRoutes)
    RoutesSvc.subscribeForUpdates(vm.initController)
  }
// jscs:disable disallowSemicolons
})();
