(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.directive:routeNotes
  * @description
  * Angular directive which represent summary of a
  * route display on a card
  */
  angular.module('siurana.routes')
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
