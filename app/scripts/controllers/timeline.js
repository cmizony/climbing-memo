'use strict'

/**
* @ngdoc function
* @name climbingMemo.controller:TimelineCtrl
* @description
* # TimelineCtrl
* Controller of the climbingMemo
*/
angular.module('climbingMemo')
.controller('TimelineCtrl', function($scope, timelineSvc, routesSvc,
$localStorage, $log, $rootScope, utilsChartSvc, $modal) {

  // Get Data
  routesSvc.getRoutes().then(function(result) {
    var data = result.data
    data = data || {}
    $localStorage.routes = data
    $scope.initController(data)
  })
  .catch(function() {
    $log.log('Local Storage used - routes')
    $scope.initController($localStorage.routes || [])
  })

  $rootScope.$on('routesUpdated', function(event, data) {
    $scope.initController(data)
  })


  /**
   * Get route color based on type
   *
   * @method getTypeColor
   * @param {Object} Route
   *
   * @return {String} Css color
   */
  $scope.getTypeColor = function(event) {
    return utilsChartSvc.typeColor(event.mainType)
  }

  $scope.getBadgeTooltip = function(event) {
    return (event.isIndoor ? 'Indoor' : 'Outdoor') + ' ' + event.mainType
  }

  $scope.getBadgeIcon = function(event) {
    return 'fa ' + (event.isIndoor ? 'fa-home' : 'fa-sun-o')
  }

  /**
  * Open a modal to display route details
  *
  * @method openRouteModal
  */
  $scope.openRouteModal = function(route, routes) {
    $modal.open({
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

  // Init Controller
  $scope.initController = function(data) {
    var arrayRoutes = _.toArray(data)
    var events = timelineSvc.processData(arrayRoutes)

    $scope.events = events
  }
})
