(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.directive:routeBuilder
  * @description
  * Angular directive which represent summary of a
  * route display on a card
  */
  angular.module('siurana.routes')
  .directive('routeBuilder', routeBuilderDirective)

    routeBuilderDirective.$inject = [
    ]

    function routeBuilderDirective() {
      return {
        restrict: 'E',
        scope: {
          route: '='
        },
        templateUrl: 'components/routes/views/_routeBuilder.html'
      }
    }
// jscs:disable disallowSemicolons
})();
