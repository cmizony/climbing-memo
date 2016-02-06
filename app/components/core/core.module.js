(function() {
  'use strict'

  /**
  * @module siuranaCore
  * @name siuranaCore.app:Module
  * @description
  * Module creation for core
  * Constain APP_CONFIG that is being generated on the build
  */
  angular.module('siurana.core', [
    'ngStorage'
  ])

  angular.module('siurana.core')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor')
  }])

// jscs:disable disallowSemicolons
})();
