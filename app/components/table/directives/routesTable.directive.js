(function() {
  'use strict'

  /**
  * @module siuranaTable
  * @name siuranaTable.directive:routesTable
  * @description
  * # routesTable
  */
  angular.module('siurana.table')
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
