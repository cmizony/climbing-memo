(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.service:RoutesCache
  * @description
  * # RoutesCache
  * Service in the siuranaRoutes
  * @TODO Handle localStorage logic in this service
  */
  angular.module('siurana.routes')
  .service('RoutesCache', RoutesCacheService)

  RoutesCacheService.$inject = [
  ]

  /**
  * Routes update event callback definition
  * @callback routesUpdate
  * @param {Array} routes
  */
  function RoutesCacheService() {
    var RoutesCache = {}

    /**
    * @type {Object} routes
    * @private
    */
    RoutesCache.data = null

    /**
    * @type {Array} Callback
    * @private
    */
    RoutesCache.listeners = []

    /**
    * @method getData
    * @description Get cached routes
    */
    RoutesCache.getData = function() {
      return RoutesCache.data
    }

    /**
    * @method publishUpdate
    * @description
    * Call all listener with current cached data
    */
    RoutesCache.publishUpdate = function() {
      _.forEach(RoutesCache.listeners, function(listener) {
        listener(RoutesCache.data)
      })
    }

    /**
    * @method setData
    * @param {Object} data
    * @param {String} index - Object property
    * @description
    * Set cached variable and call all listeners with updated data
    */
    RoutesCache.setData = function(data, index) {
      if (index) {
        RoutesCache.data = RoutesCache.data || {}
        RoutesCache.data[index] = data
      } else {
        RoutesCache.data = data
      }

      RoutesCache.publishUpdate()
    }

    /**
    * @method removeData
    * @param {String} index - Object property
    * @description
    * Remove at given index call all listeners with updated data
    */
    RoutesCache.removeData = function(index) {
      if (RoutesCache.data) {
        delete RoutesCache.data[index]
        RoutesCache.publishUpdate()
      }
    }

    /**
    * @method addListener
    * @param {routesUpdate} - Callback
    * @description Function to call when `data` is being updated
    */
    RoutesCache.addListener = function(callback) {
      RoutesCache.listeners.push(callback)
    }

    return RoutesCache
  }

// jscs:disable disallowSemicolons
})();
