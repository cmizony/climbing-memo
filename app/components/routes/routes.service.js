(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.service:routesSvc
  * @description
  * # routesSvc
  * Service of the climbingMemoRoutes
  */
  angular.module('climbingMemo.routes')
  .service('routesSvc', routesService)

  routesService.$inject = [
    '$http',
    '$rootScope',
    '$localStorage',
    'Auth',
    'APP_CONFIG'
  ]

  function routesService($http, $rootScope, $localStorage, Auth, APP_CONFIG) {
    var Routes = {}

    /**
    * Dynamically generate database URL and save bucket name
    * Use session uid
    *
    * @TODO add http interceptors
    * @param {String} uri
    * @return {String} url
    */
    Routes.getUrl = function(uri) {
      var session = Auth.getSession()
      var tokenParam = session.token ? '?auth=' + session.token : ''
      return APP_CONFIG.url +
        'users/' + session.uid +
        '/routes/' + uri + tokenParam
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
      return $http.get(Routes.getUrl(id + '.json'))
    }

    /**
    * Request all routes from database
    *
    * @return {Object} promise
    */
    Routes.getRoutes = function() {
      return $http.get(Routes.getUrl('.json'))
    }

    /**
    * Add a route to the database
    *
    * @param {Object} route
    * @return {Object} promise
    */
    Routes.addRoute = function(route) {
      var cleanedRoute = Routes.cleanObjectProperties(route)

      return $http.post(Routes.getUrl('.json'), cleanedRoute)
    }

    /**
    * Delete a route from database
    *
    * @param {Object} route
    * @return {Object} promise
    */
    Routes.deleteRoute = function(id) {
      return $http.delete(Routes.getUrl(id + '.json'))
    }

    /**
    * Request all routes from database
    *
    * @return {Object} promise
    */
    Routes.updateRoute = function(route, id) {
      var cleanedRoute = Routes.cleanObjectProperties(route)

      return $http.patch(Routes.getUrl(id + '.json'), cleanedRoute)
    }

    return Routes
  }
// jscs:disable disallowSemicolons
})();
