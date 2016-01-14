(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.controller:ModaladdrouteCtrl
  * @description
  * # ModaladdrouteCtrl
  * Controller of the climbingMemoRoutes
  */
  angular.module('climbingMemo.routes')
  .controller('ModaladdrouteCtrl', modalAddRouteController)

  modalAddRouteController.$inject = [
    '$uibModalInstance',
    '$scope',
    '$rootScope',
    '$log',
    'routeNoteFormattingFilter',
    'utilsChartSvc',
    'RoutesSvc',
    'RoutesUtilsSvc'
  ]

  function modalAddRouteController($uibModalInstance, $scope, $rootScope, $log,
  routeNoteFormattingFilter, utilsChartSvc, RoutesSvc, RoutesUtilsSvc)  {
    // Buffer for all routes
    $scope.arrayRoutes = []

    // Get Data
    RoutesSvc.getRoutes().then(function(data) {
      $scope.initController(data)
    })

    // Watch Update event
    $rootScope.$on('routesUpdated', function() {
      RoutesSvc.getRoutes().then(function(data) {
        $scope.initController(data)
      })
    })

    /**
    * Close the modal
    *
    * @method cancelEdit
    */
    $scope.cancelEdit = function() {
      $uibModalInstance.dismiss('cancel')
    }

    /**
    * Flip the card by simulating mouse hover
    *
    * @method flipCard
    */
    $scope.flipCard = function() {
      $scope.route.$hover = !$scope.route.$hover
    }

    /**
    * Populate smart default values when a sector is selected
    *
    * @method sectorPopulatePlaceholder
    */
    $scope.sectorPopulatePlaceholder = function() {

      var filteredArrayRoutes = $scope.arrayRoutes.filter(function(n) {
        return n.sector === $scope.route.sector
      })

      var properties = ['type','rock','location']

      for (var i=0 ; i < properties.length ; i++) {
        var property = properties[i]
        if (!$scope.route.hasOwnProperty(property)) {
          $scope.route[property] = utilsChartSvc.arrayGroupBy(filteredArrayRoutes,property)[0]
        }
      }
    }

    /**
    * Save route - it will calculate the lat long
    *
    * @method saveRoute
    */
    $scope.saveRoute = function() {
      RoutesSvc.saveRoute($scope.route)
      .then(function(routeId) {
        $rootScope.$broadcast('routesUpdated', routeId)
      }).catch(function(routeId) {
        $rootScope.$broadcast('routesUpdated', routeId)
      })

      $scope.cancelEdit()
    }

    $scope.initController = function(data) {
      var route = {}
      route.notes = routeNoteFormattingFilter()
      route.$date = new Date()
      route.status = 'Attempt'

      $scope.arrayRoutes    = _.toArray(data)
      $scope.locations = utilsChartSvc.arrayGroupBy($scope.arrayRoutes,"location")
      $scope.sectors = utilsChartSvc.arrayGroupBy($scope.arrayRoutes,"sector")

      $scope.route = route
    }

    $scope.getIconStatus  = function(route) { return RoutesUtilsSvc.getIconStatus(route) }
    $scope.getIconRock    = function(route) { return RoutesUtilsSvc.getIconRock(route) }
    $scope.getIndoorLabel = function(route) { return RoutesUtilsSvc.getIndoorLabel(route) }
    $scope.getTypeColor   = function(route) { return RoutesUtilsSvc.getTypeColor(route) }
  }
// jscs:disable disallowSemicolons
})();
