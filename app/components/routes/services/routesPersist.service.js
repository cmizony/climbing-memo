(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.service:
  * @description
  * Service of the climbingMemoRoutes
  */
  angular.module('climbingMemo.routes')
  .service('RoutesPersistSvc', RoutesPersistSvc)

  RoutesPersistSvc.$inject = [
    '$http',
    'Auth',
    'APP_CONFIG'
  ]

  function RoutesPersistSvc($http, Auth, APP_CONFIG) {
    var RoutesPersist = {}

    /**
    * Dynamically generate database URL and save bucket name
    * Use session uid
    *
    * @TODO add http interceptors
    * @param {String} uri
    * @return {String} url
    */
    RoutesPersist.getUrl = function(uri) {
      var session = Auth.getSession()
      return APP_CONFIG.url +
        'users/' + session.uid +
        '/routes/' + uri
    }

    /**
    * Remove properties starting with "$" sign
    *
    * @param {Object} object
    * @return {Object}
    */
    RoutesPersist.cleanObjectProperties = function(object) {
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
    RoutesPersist.getRoute = function(id) {
      return $http.get(RoutesPersist.getUrl(id + '.json'))
    }

    /**
    * Request all routes from database
    *
    * @return {Object} promise
    */
    RoutesPersist.getRoutes = function() {
      return $http.get(RoutesPersist.getUrl('.json'))
    }

    /**
    * Add a route to the database
    *
    * @param {Object} route
    * @return {Object} promise
    */
    RoutesPersist.addRoute = function(route) {
      var cleanedRoute = RoutesPersist.cleanObjectProperties(route)

      return $http.post(RoutesPersist.getUrl('.json'), cleanedRoute)
    }

    /**
    * Delete a route from database
    *
    * @param {Object} route
    * @return {Object} promise
    */
    RoutesPersist.deleteRoute = function(id) {
      return $http.delete(RoutesPersist.getUrl(id + '.json'))
    }

    /**
    * Request all routes from database
    *
    * @return {Object} promise
    */
    RoutesPersist.updateRoute = function(route, id) {
      var cleanedRoute = RoutesPersist.cleanObjectProperties(route)

      return $http.patch(RoutesPersist.getUrl(id + '.json'), cleanedRoute)
    }

    return RoutesPersist
  }
// jscs:disable disallowSemicolons
})();
