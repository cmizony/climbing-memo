(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.app:Module
  * @description
  * Module creation and set dependencies
  */
  angular.module('climbingMemo', [
    'climbingMemo.users',
    'climbingMemo.routes',
    'climbingMemo.charts',
    'climbingMemo.map',
    'climbingMemo.timeline',
    'climbingMemo.table',
    'ngRoute',
    'ui.bootstrap',
    'jlareau.pnotify',
    'ngStorage',
    'ngTouch',
    'angular-scroll-animate'
  ])
// jscs:disable disallowSemicolons
})();
