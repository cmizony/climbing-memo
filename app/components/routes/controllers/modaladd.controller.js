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
    '$log',
    'routeNoteFormattingFilter',
    'utilsChartSvc',
    'RoutesSvc'
  ]

  function modalAddRouteController($uibModalInstance, $scope, $log,
  routeNoteFormattingFilter, utilsChartSvc, RoutesSvc)  {
    // Buffer for all routes
    $scope.arrayRoutes = []

    // Get Data
    RoutesSvc.getRoutes().then(function(data) {
      $scope.initController(data)
    })

    /**
    * Close the modal
    *
    * @method cancelEdit
    */
    $scope.cancelEdit = function() {
      $scope.route.$editMode = false
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
      $scope.route.$editMode = false
      RoutesSvc.saveRoute($scope.route)

      $scope.cancelEdit()
    }

    $scope.initController = function(data) {
      var route = {}
      route.notes = routeNoteFormattingFilter()
      route.$date = new Date()
      route.$editMode = true
      route.status = 'Attempt'

      $scope.arrayRoutes    = _.toArray(data)
      $scope.locations = utilsChartSvc.arrayGroupBy($scope.arrayRoutes,"location")
      $scope.sectors = utilsChartSvc.arrayGroupBy($scope.arrayRoutes,"sector")

      $scope.route = route
    }
  }
// jscs:disable disallowSemicolons
})();
