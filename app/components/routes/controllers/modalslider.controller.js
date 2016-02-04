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
      route.$copy = _.clone(route)
      route.$date = new Date(route.date)
      route.$editMode = true
    }

    $scope.deleteRoute = function(route) {
      route.$editMode = false
      RoutesSvc.deleteRoute(route)

      $scope.closeModal()
    }

    $scope.saveRoute = function(route) {
      route.$editMode = false
      RoutesSvc.saveRoute(route)
    }

    $scope.cancelEdit = function(route) {
      route = _.merge(route, route.$copy)
      route.$editMode = false
      delete route.$copy
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
