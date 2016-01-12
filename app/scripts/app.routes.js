(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.app:Routes
  * @description
  * Routes for climbingMemo app:
  * <ul>
  *   <li>`/table` Table view of routes</li>
  *   <li>`/timeline` Timeline view of routes</li>
  *   <li>`/maps` Google map view for sectors</li>
  *   <li>`/charts` Data visualization for routes</li>
  * </ul>
  * Default route is `/timeline`
  */
  angular.module('climbingMemo')
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
    .otherwise({
      redirectTo: '/'
    })
  })
// jscs:disable disallowSemicolons
})();
