(function() {
  'use strict'

  /**
  * @module climbingMemoTimeline
  * @name climbingMemoTimeline.controller:TimelineCtrl
  * @description
  * # TimelineCtrl
  * Controller of the climbingMemoTimeline
  */
  angular.module('climbingMemo.timeline')
  .controller('TimelineCtrl', timelineController)

  timelineController.$inject = [
    '$log',
    '$uibModal',
    'timelineSvc',
    'RoutesSvc',
    'RoutesUtilsSvc',
    'ResolvedRoutes'
  ]

  function timelineController($log, $uibModal,timelineSvc,
  RoutesSvc, RoutesUtilsSvc, ResolvedRoutes) {
    /* jshint validthis:true */
    var vm = this

    /**
    * Get route color based on type
    *
    * @method getTypeColor
    * @param {Object} Route
    *
    * @return {String} Css color
    */
    vm.getTypeColor = function(event) {
      return RoutesUtilsSvc.getTypeColor({type: event.mainType})
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
        templateUrl: 'components/routes/views/sliderModal.html',
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
        templateUrl: 'components/routes/views/_modalAddRoute.html',
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

    vm.initController(ResolvedRoutes)
    RoutesSvc.subscribeForUpdates(vm.initController)
  }
// jscs:disable disallowSemicolons
})();
