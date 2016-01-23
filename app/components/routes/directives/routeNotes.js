(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.directive:routeNotes
  * @description
  * Angular directive which represent summary of a
  * route display on a card
  */
  angular.module('climbingMemo.routes')
  .directive('routeNotes', routeNotesDirective)

    routeNotesDirective.$inject = [
    ]

    function routeNotesDirective() {
      return {
        restrict: 'E',
        scope: {
          route: '='
        },
        templateUrl: 'components/routes/views/_routeNotes.html'
      }
    }
// jscs:disable disallowSemicolons
})();
