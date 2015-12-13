'user strict'

/**
* @module climbingMemo
* @name climbingMemo.directive:headerOverview
* @description
* # headerOverview
* Directive of the climbingMemo
* @example
* <header-overview></header-overview>
*/
angular.module('climbingMemo')
.directive('headerOverview', function() {
  return {
    scope: true,
    restrict: 'E',
    templateUrl: 'views/_headerOverview.html'
  }
})
