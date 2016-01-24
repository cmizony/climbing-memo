(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.directive:routeMedia
  * @description
  * Angular directive which represent summary of a
  * route display on a card
  */
  angular.module('climbingMemo.routes')
  .directive('routeMedia', routeMediaDirective)

    routeMediaDirective.$inject = [
    ]

    function routeMediaDirective() {
      return {
        restrict: 'E',
        scope: {
          route: '='
        },
        templateUrl: 'components/routes/views/_routeMedia.html'
      }
    }
// jscs:disable disallowSemicolons
})();
