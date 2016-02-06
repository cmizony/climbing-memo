(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.service:RoutesSvc
  * @description
  * # Routes service architecture interface:
  * ```sh
  *                               +---------------------+
  *                               | RoutesCache service |
  *                               +---------------------+
  * +--------------+              |  Caching Interface  |
  * | Directive A  +--+           |  Handle events      |
  * +--------------+  |           +---------^-----------+
  *                   |                     |
  * +--------------+  |          +----------+-----------+
  * | Directive B  +--+          |                      |
  * +--------------+  |  +-------+--------+   +---------+----------+
  *                   |  | Routes service +---> RoutesSync service |
  * +--------------+  |  +----------------+   +--------------------+
  * | Directive N  +--+--> Main Interface |   |  Handle offline    |
  * +--------------+  |  | Notifications  |   |  Handle sync       |
  *                   |  +----------------+   +---------+----------+
  * +--------------+  |                                 |
  * | Controller A +--+                    +------------v----------+
  * +--------------+  |                    | RoutesPersist service |
  *                   |                    +-----------------------+
  * +--------------+  |                    |  Store on Firebase    |
  * | ...          +--+                    |  Clean sproperties    |
  * +--------------+                       +-----------------------+
  * ```
  */
  angular.module('siurana.routes')
  .service('RoutesSvc', RoutesService)

  RoutesService.$inject = [
    '$q',
    'notificationService',
    'RoutesSyncSvc',
    'RoutesCache'
  ]

  /**
  * Routes update event callback definition
  * @callback routesUpdate
  * @param {Array} routes
  */
  function RoutesService($q, notificationService, RoutesSyncSvc, RoutesCache) {
    var Routes = {}

    /**
     * @method subscribeForUpdates
     * @param {routesUpdate} - Callback
     * @description Map to RoutesCache service
     */
    Routes.subscribeForUpdates = RoutesCache.addListener

    Routes.getRoutes = function() {
      return RoutesSyncSvc.getRoutes()
    }

    Routes.saveRoute = function(route) {
      var deferred = $q.defer()

      RoutesSyncSvc.saveRoute(route).then(function(route) {
        notificationService.success(route.name + ' saved')
        deferred.resolve(route)
      }).catch(function(eventName) {
        notificationService.info('Offline mode: "' + eventName +
        '" event saved')
        deferred.reject(false)
      })

      return deferred.promise
    }

    Routes.deleteRoute = function(route) {
      var deferred = $q.defer()

      RoutesSyncSvc.deleteRoute(route).then(function(route) {
        notificationService.success(route.name + ' deleted')
        deferred.resolve(route)
      }).catch(function() {
        notificationService.info('Offline mode: "delete" event saved')
        deferred.reject(false)
      })

      return deferred.promise
    }

    return Routes
  }

// jscs:disable disallowSemicolons
})();
