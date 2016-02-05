(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.controller:ModaladdrouteCtrl
  * @description
  * # ModaladdrouteCtrl
  * Controller of the siuranaRoutes
  */
  angular.module('siurana.routes')
  .controller('ModaladdrouteCtrl', modalAddRouteController)

  modalAddRouteController.$inject = [
    '$uibModalInstance',
    '$scope',
    '$log',
    'routeNoteFormattingFilter',
    'RoutesSvc'
  ]

  function modalAddRouteController($uibModalInstance, $scope, $log,
  routeNoteFormattingFilter, RoutesSvc)  {
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
    * Save route - it will calculate the lat long
    *
    * @method saveRoute
    */
    $scope.saveRoute = function() {
      $scope.route.$editMode = false
      RoutesSvc.saveRoute($scope.route)

      $scope.cancelEdit()
    }

    $scope.initController = function() {
      var route = {}
      route.notes = routeNoteFormattingFilter()
      route.$date = new Date()
      route.$editMode = true
      route.status = 'Attempt'

      $scope.route = route
    }

    $scope.initController()
  }
// jscs:disable disallowSemicolons
})();
