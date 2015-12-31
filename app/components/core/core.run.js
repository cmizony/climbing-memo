(function() {
  'use strict'

  /**
  * @module climbingMemoCore
  * @name climbingMemoCore.app:Run
  * @description
  * Run function to handle routes events
  */
  angular.module('climbingMemo.core')
  .run(routesEventsRun)

  routesEventsRun.$inject = ['$rootScope', '$location', 'Auth']

  function routesEventsRun($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function(event) {
      if (!Auth.isLoggedIn() &&
          $location.url() !== '/') {
        event.preventDefault()
        $location.path('/')
      }
    })
  }
// jscs:disable disallowSemicolons
})();
