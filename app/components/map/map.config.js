(function() {
  'use strict'

  /**
  * @module climbingMemoMap
  * @name climbingMemoMap.app:Config
  * @description
  * Application configuration
  */
  angular.module('climbingMemo.map')
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    })
  })
// jscs:disable disallowSemicolons
})();
