(function() {
  'use strict'

  /**
  * @module climbingMemoUsers
  * @name climbingMemoUsers.directive:userLogin
  * @description
  * # userLogin
  * Directive of the climbingMemoUsers
  */
  angular.module('climbingMemo.users')
  .directive('userLogin', userLoginDirective)

  userLoginDirective.$inject = [
    'UserLoginSvc',
    'notificationService',
    'Auth'
  ]

  function userLoginDirective(UserLoginSvc,
  notificationService, Auth) {
    return {
      restrict: 'E',
      templateUrl: 'components/users/views/_userLogin.html',
      link: function(scope) {
        scope.signIn = function(provider) {
          switch (provider) {
            case 'google':
              UserLoginSvc.googleSignIn()
              .then(function(profile) {
                scope.initDirective()
                notificationService.success('Welcome ' + profile.name)
              }).catch(function() {
                notificationService.error('Authentication failed')
              })
              break
          }
        }

        scope.logOut = UserLoginSvc.logOut

        scope.initDirective = function() {
          scope.isLoggedIn = Auth.isLoggedIn
          scope.name = Auth.getSession().name
        }

        scope.initDirective()
      }
    }
  }
// jscs:disable disallowSemicolons
})();
