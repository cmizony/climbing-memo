(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.directive:routeName
  * @description
  * # mainNavbar
  * Angular form validation for route name
  */
  angular.module('climbingMemo.routes')
  .directive('routeName', function($q, RoutesSvc) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        /**
        * Returns a promise that reject if the name already exists
        * @method validateName
        * @param {String} name
        * @return {Object} - promise
        */
        scope.validateName = function(name) {
          var deferred = $q.defer()

          RoutesSvc.getRoutes().then(function(routes) {
            if (_.find(routes, function(route) {
              return route.name === name
            })) {
              deferred.reject()
            } else {
              deferred.resolve()
            }
          }).catch(function() {
            deferred.resolve()
          })

          return deferred.promise
        }

        ctrl.$asyncValidators.routeName = scope.validateName
      }
    }
  })
// jscs:disable disallowSemicolons
})();
