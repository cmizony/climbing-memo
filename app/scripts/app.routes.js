(function() {
  'use strict'

  /**
  * @modulesiurana
  * @name siurana.app:Routes
  * @description
  * Routes for siurana app:
  * <ul>
  *   <li>`/table` Table view of routes</li>
  *   <li>`/timeline` Timeline view of routes</li>
  *   <li>`/maps` Google map view for sectors</li>
  *   <li>`/charts` Data visualization for routes</li>
  * </ul>
  * Default route is `/timeline`
  */
  angular.module('siurana')
  .config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      resolve: {
        authentication: function($q, $location, Auth) {
          var deferred = $q.defer()
          if (Auth.isLoggedIn()) {
            deferred.reject()
            $location.path('/timeline')
          } else {
            deferred.resolve()
          }
          return deferred.promise
        }
      }
    })
    .when('/charts', {
      controller: 'chartsCtrl',
      templateUrl: 'views/chartsLayout.html',
      controllerAs: 'chartsVm',
      resolve: {
        ResolvedRoutes: ['RoutesSvc', function(RoutesSvc) {
          return RoutesSvc.getRoutes()
        }]
      }
    })
    .when('/map', {
      controller: 'mapCtrl',
      templateUrl: 'views/mapLayout.html',
      controllerAs: 'mapVm',
      resolve: {
        ResolvedRoutes: ['RoutesSvc', function(RoutesSvc) {
          return RoutesSvc.getRoutes()
        }]
      }
    })
    .when('/table', {
      controller: 'tableCtrl',
      templateUrl: 'views/tableLayout.html',
      controllerAs: 'tableVm',
      resolve: {
        ResolvedRoutes: ['RoutesSvc', function(RoutesSvc) {
          return RoutesSvc.getRoutes()
        }]
      }
    })
    .when('/timeline', {
      templateUrl: 'views/timelineLayout.html',
      controller: 'TimelineCtrl',
      controllerAs: 'timelineVm',
      resolve: {
        ResolvedRoutes: ['RoutesSvc', function(RoutesSvc) {
          return RoutesSvc.getRoutes()
        }]
      }
    })
    .otherwise({
      redirectTo: '/'
    })
  })
// jscs:disable disallowSemicolons
})();
