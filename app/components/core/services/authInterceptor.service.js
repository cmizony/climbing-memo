(function() {
  'use strict'

  /**
  * @module climbingMemoCore
  * @name climbingMemoCore.service:authInterceptor
  * @description
  * # authInterceptor
  * Service in the climbingMemo core module
  */
  angular.module('climbingMemo.core')
  .service('authInterceptor', authInterceptorService)

  authInterceptorService.$inject = [
    '$q',
    '$location',
    'Auth',
    'APP_CONFIG'
  ]

  function authInterceptorService($q, $location, Auth, APP_CONFIG) {
    var authInterceptor = {}

    authInterceptor.request = function(request) {
      if (request.url.indexOf(APP_CONFIG.url) === 0 &&
          Auth.getToken()) {
        var separator = request.url.indexOf('?') === -1 ? '?' : '&'
        request.url += separator + 'auth=' + Auth.getToken()
      }
      return request
    }

    authInterceptor.responseError = function(response) {
      if (response.status === 401 &&
          $location.url() !== '/') {
        $location.path('/')
      }
      return $q.reject(response)
    }

    return authInterceptor
  }
// jscs:disable disallowSemicolons
})();
