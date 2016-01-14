(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.service:RoutesSyncSvc
  * @description
  * Service in the climbingMemoRoutes
 s */
  angular.module('climbingMemo.routes')
  .service('RoutesSyncSvc', RoutesSyncService)

  RoutesSyncService.$inject = [
    '$filter',
    '$http',
    '$q',
    '$localStorage',
    '$rootScope',
    '$timeout',
    '$log',
    'RoutesPersistSvc'
  ]

  function RoutesSyncService($filter, $http, $q, $localStorage, $rootScope,
  $timeout, $log, RoutesPersistSvc) {
    var RoutesSync = {}
    RoutesSync.cache = null

    /**
    * Get routes - from firebase or localStorage
    *
    * @method getRoutes
    * @param {Boolean} forceRefresh
    * @return {Object} - Promise
    */
    RoutesSync.getRoutes = function(forceRefresh) {
      var deferred = $q.defer()

      if (RoutesSync.cache && !forceRefresh) { // Use Cache
        deferred.resolve(RoutesSync.cache)
      } else { // Query network
        RoutesPersistSvc.getRoutes().then(function(result) {
          RoutesSync.syncRoutes()

          var data = result.data || {}
          $localStorage.routes = data
          RoutesSync.cache = data
          deferred.resolve(data)
        })
        .catch(function() {
          if (forceRefresh) { // Should come from the network
            $log.log('Offline mode: can\'t refresh routes')
            deferred.reject(false)
          } else { // Use LocalStorage
            $log.log('Local Storage used - routes')
            RoutesSync.cache = $localStorage.routes
            deferred.resolve($localStorage.routes || [])

            if (_.find(RoutesSync.cache, function(cachedRoute) {
              return angular.isDefined(cachedRoute.$sync)
            })) {
              RoutesSync.createTimeout()
            }
          }
        })
      }

      return deferred.promise
    }

    /**
    * Persist new route and handle if sourceRoute is a copy
    *
    * @method createRoute
    * @private
    * @param {Object} sourceRoute - reference to the original route
    * @param {Object} route - copy or sourceRoute
    * @param {Object} deferred - parent promise to resolve
    */
    RoutesSync.createRoute = function(sourceRoute, route, deferred) {
      RoutesPersistSvc.addRoute(route)
      .then(function(result) {
        route.id = result.data.name
        RoutesPersistSvc.updateRoute(route, route.id)

        if (angular.isDefined(route.$copy)) {
          sourceRoute = route.$copy // Revert source route
          RoutesSync.cache[sourceRoute.id] = RoutesPersistSvc.cleanObjectProperties(sourceRoute)
        }

        RoutesSync.cache = RoutesSync.cache || {}
        RoutesSync.cache[route.id] = RoutesPersistSvc.cleanObjectProperties(route)
        deferred.resolve(route)
      })
      .catch(function() {
        RoutesSync.createRouteSync('create', route)
        deferred.reject('create')
      })
    }

    /**
    * Persist existing route
    *
    * @method updateRoute
    * @private
    * @param {Object} route
    * @param {Object} deferred - parent promise to resolve
    */
    RoutesSync.updateRoute = function(route, deferred) {
      RoutesPersistSvc.updateRoute(route, route.id)
      .then(function() {
        RoutesSync.cache = RoutesSync.cache || {}
        RoutesSync.cache[route.id] = RoutesPersistSvc.cleanObjectProperties(route)
        deferred.resolve(route)
      })
      .catch(function() {
        RoutesSync.createRouteSync('update', route)
        deferred.reject('update')
      })
    }

    /**
    * Save route - it will calculate the lat long
    *
    * @method saveRoute
    * @param {Object} route
    * @return {Object} promise - resolve as id or false
    */
    RoutesSync.saveRoute = function(sourceRoute) {
      var deferred = $q.defer()

      var route = JSON.parse(JSON.stringify(sourceRoute)) // Clone
      route.date = $filter('date')(route.$date,'MM/dd/yyyy')

      var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

      $http.get(baseUrl + encodeURIComponent(route.location))
      .then(function(result) {
        var data = result.data
        if (data.status !== 'ZERO_RESULTS') {
          route.latitude = data.results[0].geometry.location.lat
          route.longitude = data.results[0].geometry.location.lng
        }

        if (route.id) { // Update route
          RoutesSync.updateRoute(route, deferred)
        } else { // Create new route
          RoutesSync.createRoute(sourceRoute, route, deferred)
        }
      })
      .catch(function() {
        var routeEvent = route.id ? 'update' : 'create'
        RoutesSync.createRouteSync(routeEvent, route)
        deferred.reject(routeEvent)
      })

      return deferred.promise
    }

    /**
    * Delete a route
    *
    * @method deleteRoute
    * @param {Object} route
    * @return {Object} promise - route id or false
    */
    RoutesSync.deleteRoute = function(route) {
      var deferred = $q.defer()

      RoutesPersistSvc.deleteRoute(route.id)
      .then(function() {
        if (RoutesSync.cache) { // Update Cache
          delete RoutesSync.cache[route.id]
        }
        deferred.resolve(route)
      })
      .catch(function() {
        RoutesSync.createRouteSync('delete', route)
        deferred.reject(false)
      })

      return deferred.promise
    }

    //  ____             _                 ____
    // |  _ \ ___  _   _| |_ ___          / ___| _   _ _ __   ___
    // | |_) / _ \| | | | __/ _ \  _____  \___ \| | | | '_ \ / __|
    // |  _ < (_) | |_| | ||  __/ |_____|  ___) | |_| | | | | (__
    // |_| \_\___/ \__,_|\__\___|         |____/ \__, |_| |_|\___|
    //                                           |___/

    var intervalDelay = 30000 // 30 sec
    var canCreateTimeout = true

    /**
    * Create route sync property in localStorage
    *
    * @method createRouteSync
    * @param {String} event
    * @param {Object} route
    */
    RoutesSync.createRouteSync = function(event, route) {
      var localRouteFound = false

      $localStorage.routes = _.map($localStorage.routes, function(localRoute) {
        if (route.id === localRoute.id) { // Update route
          localRouteFound = true
          localRoute.$sync = event
          RoutesSync.createTimeout()
        }
        return localRoute
      })
      if (!localRouteFound && event !== 'delete') { // Create route
        route.$sync = event
        route.id = "tmp_" + _.random(10000, 99999)
        $localStorage.routes.push(route)
        RoutesSync.cache[route.id] = route
        RoutesSync.createTimeout()
      }
    }

    /**
    * Sync routes to database if needed
    *
    * @method syncRoutes
    */
    RoutesSync.syncRoutes = function() {
      if ($rootScope.online) { // Try to sync
        canCreateTimeout = true
        _.each($localStorage.routes, function(route) {
          switch (route.$sync) {
            case 'create':
            case 'update':
              var savedRouteId = route.id
              if (route.id && route.id.match(/^tmp/g)) {
                route.id = false
              }

              RoutesSync.saveRoute(route).then(function(routeId) {
                intervalDelay = 30000 // 30 sec
                delete route.$sync
                $rootScope.$broadcast('routesUpdated', routeId)
              }).catch(function() {
                route.id = savedRouteId
              })

              break
            case 'delete':
              RoutesSync.deleteRoute(route).then(function(routeId) {
                intervalDelay = 30000 // 30 sec
                delete route.$sync
                $rootScope.$broadcast('routesUpdated', routeId)
              })
              break
          }
        })
      } else if (_.find($localStorage.routes, function(localRoute) {
          return angular.isDefined(localRoute.$sync) })) {
          RoutesSync.createTimeout()
      }
    }

    /**
    * Create route timeout at incremental interval delay
    *
    * @method createTimeout
    */
    RoutesSync.createTimeout = function() {
      if (canCreateTimeout) {
        canCreateTimeout = false
        $timeout(RoutesSync.syncRoutes, intervalDelay)
        intervalDelay *= 2
      }
    }

    return RoutesSync
  }

// jscs:disable disallowSemicolons
})();
