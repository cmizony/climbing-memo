(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.directive:routeLocation
  * @description
  * # mainNavbar
  * Angular form validation for route location
  */
  angular.module('climbingMemo.routes')
  .directive('routeLocation', function($q, $http) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        /**
        * Returns a promise that reject if Google can't fint it
        * @method validateName
        * @param {String} location
        * @return {Object} - promise
        */
        scope.validateLocation = function(location) {
          var deferred = $q.defer()
          var googleBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

          if (ctrl.$isEmpty(location)) {
            return $q.when()
          }

          $http.get(googleBaseUrl + encodeURIComponent(location))
          .then(function(result) {
            if (result.data.status !== 'ZERO_RESULTS') {
              deferred.resolve()
            } else {
              deferred.reject()
            }
          }).catch(function() {
            deferred.resolve()
          })

          return deferred.promise
        }

        ctrl.$asyncValidators.routeLocation = scope.validateLocation
      }
    }
  })
// jscs:disable disallowSemicolons
})();
