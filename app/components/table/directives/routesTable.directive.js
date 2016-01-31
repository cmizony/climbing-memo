(function() {
  'use strict'

  /**
  * @module climbingMemoTable
  * @name climbingMemoTable.directive:routesTable
  * @description
  * # routesTable
  */
  angular.module('climbingMemo.table')
  .directive('routesTable', routesTableDirective)

  routesTableDirective.$inject = [
  ]

  function routesTableDirective() {
    return {
      templateUrl: 'components/table/views/_routesTable.html',
      restrict: 'E'
    }
  }
// jscs:disable disallowSemicolons
})();
