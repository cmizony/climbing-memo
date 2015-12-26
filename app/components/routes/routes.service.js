(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.factory:routesSvc
  * @description
  * # routesSvc
  * Factory of the climbingMemoRoutes
  */
  angular.module('climbingMemo.routes')
  .service('routesSvc', routesService)

  routesService.$inject = [
    '$http',
    '$rootScope',
    '$localStorage',
    'DATABASE_URL'
  ]

  function routesService($http, $rootScope, $localStorage, DATABASE_URL) {
    var Routes = {}

    /**
    * Dynamically generate database URL and save bucket name
    *
    * @return {String}
    */
    Routes.getBaseUrl = function() {
      var bucket = $rootScope.bucket || $localStorage.bucket || 'demo'
      return DATABASE_URL + bucket + '/routes'
    }

    /**
    * Remove properties starting with "$" sign
    *
    * @param {Object} object
    * @return {Object}
    */
    Routes.cleanObjectProperties = function(object) {
      var cleanedObject = JSON.parse(JSON.stringify(object)) // Clone

      _.keys(cleanedObject)
      .filter(function(key) { return key.match(/^\$/) })
      .forEach(function(key) { delete cleanedObject[key] })

      return cleanedObject
    }

    /**
     * Request a route from database
     *
     * @param {String} id
     * @return {Object} promise
     */
    Routes.getRoute = function(id) {
      return $http.get(Routes.getBaseUrl() + '/' + id + '.json')
    }

    /**
    * Request all routes from database
    *
    * @return {Object} promise
    */
    Routes.getRoutes = function() {
      return $http.get(Routes.getBaseUrl() + '.json')
    }

    /**
    * Add a route to the database
    *
    * @param {Object} route
    * @return {Object} promise
    */
    Routes.addRoute = function(route) {
      var cleanedRoute = Routes.cleanObjectProperties(route)

      return $http.post(Routes.getBaseUrl() + '/.json', cleanedRoute)
    }

    /**
    * Delete a route from database
    *
    * @param {Object} route
    * @return {Object} promise
    */
    Routes.deleteRoute = function(id) {
      return $http.delete(Routes.getBaseUrl() + '/' + id + '.json')
    }

    /**
    * Request all routes from database
    *
    * @return {Object} promise
    */
    Routes.updateRoute = function(route, id) {
      var cleanedRoute = Routes.cleanObjectProperties(route)

      return $http.patch(Routes.getBaseUrl() + '/' +  id + '.json', cleanedRoute)
    }

    return Routes
  }
// jscs:disable disallowSemicolons
})();
