(function() {
  'use strict'

  /**
  * @modulesiurana
  * @name siurana.app:Config
  * @description
  * Application configuration
  */
  angular.module('siurana')
  .run(function($rootScope) {
    $rootScope.online = navigator.onLine // jshint ignore:line
  })
// jscs:disable disallowSemicolons
})();
