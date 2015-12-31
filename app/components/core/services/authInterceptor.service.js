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

    /**
    * Intercept http request and add auth token
    *
    * @param {Object} request
    * @returns {Object} request
    */
    authInterceptor.request = function(request) {
      if (request.url.indexOf(APP_CONFIG.url) === 0 &&
          Auth.getToken()) {
        var separator = request.url.indexOf('?') === -1 ? '?' : '&'
        request.url += separator + 'auth=' + Auth.getToken()
      }
      return request
    }

    /**
    * Intercept http error responses and handle unauthorized error code by
    * redirecting to the home page
    *
    * @param {Object} response
    * @returns {Object} response
    */
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
