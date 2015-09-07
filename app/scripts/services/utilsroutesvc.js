'use strict'

/**
* @ngdoc service
* @name climbingMemo.utilsRouteSvc
* @description
* # utilsRouteSvc
* Service in the climbingMemo.
*/
angular.module('climbingMemo')
.service('utilsRouteSvc', function($filter, notificationService, $rootScope,
routesSvc, $http, $q, utilsChartSvc, $localStorage, $log) {

  /**
  * Get routes - from firebase or localStorage
  * TODO Cache routes
  *
  * @method getRoutes
  * @return {Object} - Promise
  */
  this.getRoutes = function() {
    var deferred = $q.defer()

    routesSvc.getRoutes().then(function(result) {
      var data = result.data
      data = data || {}
      $localStorage.routes = data
      deferred.resolve(data)
    })
    .catch(function() {
      $log.log('Local Storage used - routes')
      deferred.resolve($localStorage.routes || [])
    })

    return deferred.promise
  }

  /**
  * Save route - it will calculate the lat long
  *
  * @method saveRoute
  * @param {Object} route
  * @return {Object} promise - resolve as id or false
  */
  this.saveRoute = function(route) {
    var deferred = $q.defer()

    route = JSON.parse(JSON.stringify(route)) // Clone
    route.date= $filter('date')(route.date,'MM/dd/yyyy')

    var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

    $http.get(baseUrl + encodeURIComponent(route.location))
    .then(function(result) {
      var data = result.data
      if (data.status !== 'ZERO_RESULTS') {
        route.latitude = data.results[0].geometry.location.lat
        route.longitude = data.results[0].geometry.location.lng
      }

      if (route.id) { // Update route
        routesSvc.updateRoute(route, route.id)
        .then(function() {
          deferred.resolve(route.id)
          notificationService.success(route.name + ' saved')
        })
        .catch(function() {
          deferred.reject(false)
          notificationService.error('Error while saving ' + route.name)
        })
      } else { // Create new route
        routesSvc.addRoute(route)
        .then(function(result) {
          notificationService.success(route.name + ' saved')
          route.id = result.data.name
          routesSvc.updateRoute(route, route.id)
          deferred.resolve(route.id)
        })
        .catch(function() {
          deferred.reject(false)
          notificationService.error('Error while saving ' + route.name)
        })
      }
    })
    .catch(function() {
      deferred.reject(false)
    })

    return deferred.promise
  }

  /**
  * Delete a route
  * @method deleteRoute
  * @param {Object} route
  * @return {Object} promise - route id or false
  */
  this.deleteRoute = function(route) {
    var deferred = $q.defer()

    routesSvc.deleteRoute(route.id)
    .then(function() {
      notificationService.success(route.name + ' deleted')
      deferred.resolve(route.id)
    })
    .catch(function() {
      deferred.reject(false)
      notificationService.error('Error while deleting ' + route.name)
    })

    return deferred.promise
  }

  //  ____             _                 _   _ _   _ _
  // |  _ \ ___  _   _| |_ ___          | | | | |_(_) |___
  // | |_) / _ \| | | | __/ _ \  _____  | | | | __| | / __|
  // |  _ < (_) | |_| | ||  __/ |_____| | |_| | |_| | \__ \
  // |_| \_\___/ \__,_|\__\___|          \___/ \__|_|_|___/

  /**
  * Get icon based on route status
  *
  * @method getIconStatus
  * @param {Object} route
  * @return {String}
  */
  this.getIconStatus = function(route) {
    if (!(route && route.status)) {
      return 'fa-connectdevelop'
    }
    return route.status === 'Attempt' ? 'fa-times' : 'fa-check'
  }

  /**
  * Get icon based on route rock
  *
  * @method getIconRock
  * @param {Object} route
  * @return {String}
  */
  this.getIconRock = function(route) {
    if (!(route && route.rock)) {
      return 'fa-connectdevelop'
    }
    return route.rock === 'Indoor' ? 'fa-home' : 'fa-sun-o'
  }

  /**
  * Get Indoor label based on route rock
  *
  * @method getIndoorLabel
  * @param {Object} route
  * @return {String}
  */
  this.getIndoorLabel = function(route) {
    return route.rock === 'Indoor' ? 'Indoor' : 'Outdoor'
  }

  /**
  * Get route color based on type
  *
  * @method getTypeColor
  * @param {Object} Route
  *
  * @return {String} Css color
  */
  this.getTypeColor = function(route) {
    return utilsChartSvc.typeColor(route ? route.type : '')
  }
})