(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.directive:routeAscents
  * @description
  * Angular directive which represent summary of a
  * route display on a card
  */
  angular.module('siurana.routes')
  .directive('routeAscents', routeAscentsDirective)

    routeAscentsDirective.$inject = [
    ]

    function routeAscentsDirective() {
      return {
        restrict: 'E',
        scope: {
          route: '='
        },
        templateUrl: 'components/routes/views/_routeAscents.html'
      }
    }
// jscs:disable disallowSemicolons
})();
