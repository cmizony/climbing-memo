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
    'ngRoute',
    'ui.bootstrap',
    'jlareau.pnotify',
    'ngStorage',
    'uiGmapgoogle-maps',
    'datatables',
    'ngTouch',
    'datatables.bootstrap',
    'angular-timeline',
    'angular-scroll-animate'
  ])
// jscs:disable disallowSemicolons
})();
