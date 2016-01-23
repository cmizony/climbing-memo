(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.controller:ModalsliderCtrl
  * @description
  * # ModalsliderCtrl
  * Controller of the climbingMemoRoutes
  */
  angular.module('climbingMemo.routes')
  .controller('ModalsliderCtrl', modalSliderController)

  modalSliderController.$inject = [
    '$scope',
    '$uibModalInstance',
    '$localStorage',
    '$log',
    '$rootScope',
    '$filter',
    'routesId',
    'routeNoteFormattingFilter',
    'RoutesSvc'
  ]

  function modalSliderController($scope, $uibModalInstance, $localStorage, $log,
  $rootScope, $filter, routesId, routeNoteFormattingFilter, RoutesSvc) {

    /**
    * Close the modal
    *
    * @method closeModal
    */
    $scope.closeModal = function() {
      $uibModalInstance.dismiss('cancel')
    }

    // Get Data
    RoutesSvc.getRoutes().then(function(data) {
      $scope.initController(data)
    })

    /**
    * Create slider based on routesId
    *
    * @method initController
    * @param {Array} routes
    */
    $scope.initController = function(routes) {
      var displayedRoutes = _.map(routesId, function(id) {
        return _.find(routes, function(route) {
          return route.id === id
        })
      })

      $scope.myInterval = 0
      $scope.noWrapSlides = false
      $scope.slides = _.map(displayedRoutes, function(route) {
        route.notes = routeNoteFormattingFilter(route.notes)
        return {
          content: route
        }
      })
    }

    $scope.editRoute = function(route) {
      route.$date = new Date(route.date)
      route.$editMode = true
    }

    $scope.deleteRoute = function(route) {
      route.$editMode = false
      RoutesSvc.deleteRoute(route)
      .then(function(routeId) {
        $rootScope.$broadcast('routesUpdated', routeId)
      })

      $scope.closeModal()
    }

    $scope.saveRoute = function(route) {
      route.$editMode = false

      RoutesSvc.saveRoute(route)
      .then(function(routeId) {
        $rootScope.$broadcast('routesUpdated', routeId)
      }).catch(function(routeId) {
        $rootScope.$broadcast('routesUpdated', routeId)
      })

      $scope.closeModal()
    }

    $scope.cancelEdit = function(route) {
      route.$editMode = false
      $scope.closeModal()
    }

    /**
    * Create an array of size N
    *
    * @method getTimes
    * @param {Integer} n
    * @return {Array}
    */
    $scope.getTimes = function(n) {
      return new Array(n)
    }

    /**
    * Flip the active slide
    *
    * @method flipCard
    */
    $scope.flipCard = function() {
      var activeSlide = _.first($scope.slides.filter(function(slide) {
        return slide.active
      }))
      activeSlide.$hover = !activeSlide.$hover
    }
  }
// jscs:disable disallowSemicolons
})();
