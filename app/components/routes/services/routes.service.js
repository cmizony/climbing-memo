(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.service:RoutesSvc
  * @description
  * # RoutesSvc
  * Service in the climbingMemoRoutes
  */
  angular.module('climbingMemo.routes')
  .service('RoutesSvc', RoutesService)

  RoutesService.$inject = [
    '$q',
    'notificationService',
    'RoutesSyncSvc'
  ]

  function RoutesService($q, notificationService, RoutesSyncSvc) {
    var Routes = {}

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
