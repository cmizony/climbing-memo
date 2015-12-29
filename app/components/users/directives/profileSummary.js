(function() {
  'use strict'

  /**
  * @module climbingMemoUsers
  * @name climbingMemoUsers.directive:profileSummary
  * @description
  * # profileSummary
  * Directive of the climbingMemoUsers
  */
  angular.module('climbingMemo.users')
  .directive('profileSummary', profileSummaryDirective)

  profileSummaryDirective.$inject = [
    '$rootScope',
    'UsersSvc',
    'Auth'
  ]

  function profileSummaryDirective($rootScope, UsersSvc, Auth) {
    return {
      restrict: 'E',
      templateUrl: 'components/users/views/_profileSummary.html',
      link: function(scope) {
        scope.initDirective = function() {
          var uid = Auth.getSession().uid || 'none'
          scope.profile = { name: 'Climbing Memo' }
          UsersSvc.getProfile(uid).then(function(result) {
            scope.profile = result.data
          })
        }

        scope.initDirective()
        $rootScope.$on('userUpdated', scope.initDirective)
      }
    }
  }
// jscs:disable disallowSemicolons
})();
