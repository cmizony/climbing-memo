(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.directive:cardRoute
  */
  angular.module('siurana.routes')
  .directive('cardRoute', cardRouteDirective)

    cardRouteDirective.$inject = [
    ]

    function cardRouteDirective() {
      return {
        restrict: 'E',
        templateUrl: 'components/routes/views/_cardRoute.html',
        link: function(scope) {
          scope.tabs = [
            {
              icon: 'sticky-note',
              text: 'Notes',
              type: 'notes'
            },
            {
              icon: 'camera',
              text: 'Media',
              type: 'media'
            },
            {
              icon: 'calendar',
              text: 'Ascents',
              type: 'ascents'
            },
            {
              icon: 'cubes',
              text: 'Builder',
              type: 'builder'
            }
          ]
        }
      }
    }
// jscs:disable disallowSemicolons
})();
