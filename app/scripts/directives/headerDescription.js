'use strict'

/**
* @module climbingMemo
* @name climbingMemo.directive:headerDescription
* @description
* # headerDescription
* Directive of the climbingMemo
*/
angular.module('climbingMemo')
.directive('headerDescription', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/_headerDescription.html'
  }
})
