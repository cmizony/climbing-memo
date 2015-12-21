(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.controller:TimelineCtrl
  * @description
  * # TimelineCtrl
  * Controller of the climbingMemo
  */
  angular.module('climbingMemo')
  .controller('TimelineCtrl', timelineController)

  timelineController.$inject = [
    '$localStorage',
    '$log',
    '$rootScope',
    '$uibModal',
    'timelineSvc',
    'utilsRouteSvc'
  ]

  function timelineController($localStorage, $log, $rootScope,
  $uibModal,timelineSvc, utilsRouteSvc) {
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
    * Get route color based on type
    *
    * @method getTypeColor
    * @param {Object} Route
    *
    * @return {String} Css color
    */
    vm.getTypeColor = function(event) {
      return utilsRouteSvc.getTypeColor({type: event.mainType})
    }

    /**
    * Get tooltip text based on rock type
    *
    * @method getBadgeTooltip
    * @param {Boolean} event
    * @return {String}
    */
    vm.getBadgeTooltip = function(event) {
      return (event.isIndoor ? 'Indoor' : 'Outdoor') + ' ' + event.mainType
    }

    /**
    * Get icon based on rock type
    *
    * @method getBadgeIcon
    * @param {Boolean} event
    * @return {String}
    */
    vm.getBadgeIcon = function(event) {
      return 'fa ' + (event.isIndoor ? 'fa-home' : 'fa-sun-o')
    }

    /**
    * Open a modal to display routes details
    *
    * @method openRouteModal
    * @param {Object} route - First route to display
    * @param {Array} routes - All routes in slider
    */
    vm.openRouteModal = function(route, routes) {
      $uibModal.open({
        templateUrl: 'views/sliderModal.html',
        controller: 'ModalsliderCtrl',
        size: 'md',
        resolve: {
          routesId: function() {
            var routesId = _.pluck(routes, 'id')
            var routeIndex = _.indexOf(routesId, route.id)
            return _.slice(routesId, routeIndex, routesId.length).concat(
              _.slice(routesId, 0, routeIndex)
            )
          }
        }
      })
    }

    /**
    * Open a modal to add a route
    *
    * @method addRoute
    */
    vm.addRoute = function() {
      $uibModal.open({
        templateUrl: 'views/_modalAddRoute.html',
        controller: 'ModaladdrouteCtrl',
        size: 'md'
      })
    }

    // Init Controller
    vm.initController = function(data) {
      var arrayRoutes = _.toArray(data)
      var events = timelineSvc.processData(arrayRoutes)

      vm.events = events
    }
  }
// jscs:disable disallowSemicolons
})();
