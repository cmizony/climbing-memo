(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.directive:routeName
  * @description
  * # mainNavbar
  * Angular form validation for route name
  */
  angular.module('climbingMemo')
  .directive('routeName', function($q, utilsRouteSvc) {
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

          utilsRouteSvc.getRoutes().then(function(routes) {
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
