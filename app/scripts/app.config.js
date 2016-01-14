(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.app:Config
  * @description
  * Application configuration
  */
  angular.module('climbingMemo')
  .run(function($rootScope) {
    $rootScope.online = navigator.onLine // jshint ignore:line
  })
// jscs:disable disallowSemicolons
})();
