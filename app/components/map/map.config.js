(function() {
  'use strict'

  /**
  * @module siuranaMap
  * @name siuranaMap.app:Config
  * @description
  * Application configuration
  */
  angular.module('siurana.map')
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    })
  })
// jscs:disable disallowSemicolons
})();
