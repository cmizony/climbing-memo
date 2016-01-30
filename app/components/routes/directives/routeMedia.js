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
    '$window',
    'RoutesUtilsSvc'
  ]

  function routeMediaDirective($window, RoutesUtilsSvc) {
    return {
      restrict: 'E',
      scope: {
        route: '='
      },
      templateUrl: 'components/routes/views/_routeMedia.html',
      link: function(scope) {
        scope.getMedia = RoutesUtilsSvc.getRouteMedia
        scope.isValidMedia = RoutesUtilsSvc.isValidRouteMedia
        scope.openMedia = function(media) {
          $window.open(media.link, '_blank')
        }

        scope.deleteMedia = function(link) {
          scope.route.medias = _.filter(scope.route.medias, function(mediaLink) {
            return mediaLink !== link
          })
          scope.medias = _.filter(scope.medias, function(media) {
            return media.link !== link
          })
        }

        scope.route = scope.route || {}
        scope.route.medias = scope.route.medias || []
        scope.medias = _.map(scope.route.medias, RoutesUtilsSvc.getRouteMedia)

        scope.getMedia = RoutesUtilsSvc.getRouteMedia
        scope.newMedias = ['']
        scope.$watch('newMedias', function(newMedias) {
          var validNewMedias = _.filter(newMedias, RoutesUtilsSvc.isValidRouteMedia)
          // Remove all pushed media to route
          scope.route.medias = _.pluck(scope.medias, 'link')
          // Add new media to routes
          scope.route.medias = _.union(validNewMedias, scope.route.medias)

          if (newMedias.length === validNewMedias.length) {
            scope.newMedias.push('')
          }
        }, true)

      }
    }
  }
  // jscs:disable disallowSemicolons
})();
