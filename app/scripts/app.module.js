(function() {
  'use strict'

  /**
  * @modulesiurana
  * @name siurana.app:Module
  * @description
  * Module creation and set dependencies
  */
  angular.module('siurana', [
    'siurana.users',
    'siurana.routes',
    'siurana.charts',
    'siurana.map',
    'siurana.timeline',
    'siurana.table',
    'ngRoute',
    'ui.bootstrap',
    'jlareau.pnotify',
    'ngStorage',
    'ngTouch'
  ])
// jscs:disable disallowSemicolons
})();
