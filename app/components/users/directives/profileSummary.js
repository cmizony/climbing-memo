(function() {
  'use strict'

  /**
  * @module siuranaUsers
  * @name siuranaUsers.directive:profileSummary
  * @description
  * # profileSummary
  * Directive of the siuranaUsers
  */
  angular.module('siurana.users')
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
      }
    }
  }
// jscs:disable disallowSemicolons
})();
