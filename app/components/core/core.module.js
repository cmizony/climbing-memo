(function() {
  'use strict'

  /**
  * @module climbingMemoCore
  * @name climbingMemoCore.app:Module
  * @description
  * Module creation for core
  * Constain APP_CONFIG that is being generated on the build
  */
  angular.module('climbingMemo.core', [])

  angular.module('climbingMemo.core')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor')
  }])

// jscs:disable disallowSemicolons
})();
