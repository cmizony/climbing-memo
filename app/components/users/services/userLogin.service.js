(function() {
  'use strict'

  /**
  * @module climbingMemoUsers
  * @name climbingMemoUsers.service:UserLoginSvc
  * @description
  * # UserLoginSvc
  */
  angular.module('climbingMemo.users')
  .service('UserLoginSvc', userLoginService)

  userLoginService.$inject = [
    '$log',
    '$q',
    '$rootScope',
    'UsersSvc',
    'Auth',
    'APP_CONFIG'
  ]

  function userLoginService($log, $q, $rootScope, UsersSvc, Auth,
  APP_CONFIG) {
    var UserLogin = {}

    /**
     * Handle successful login from provider
     * @method successLogin
     * @param {Object} session
     * @param {Object} profile
     * @private
     */
    UserLogin.successLogin = function(session, profile) {
      Auth.createSession(session)
      UsersSvc.updateProfile(session.uid, profile)
      $rootScope.$emit('userUpdated')
      $rootScope.$emit('routesUpdated')
    }

    /**
    * Prompt the user to login and then invoke the google login popup
    *
    * @return {Object} promise that resolve to profile info
    */
    UserLogin.googleSignIn = function() {
      var firebaseReference = new Firebase(APP_CONFIG.url)
      var deferred = $q.defer()

      firebaseReference.authWithOAuthPopup('google', function(error, data) {
        if (error) {
          $log.debug('Google authentication failed')
          deferred.reject(error)
        } else {
          var session = {
            uid:       data.uid,
            token:     data.token,
            expires:   data.expires,
            provider:  data.provider,
            name:      data.google.displayName
          }
          var profile = {
            uid:       data.uid,
            provider:  data.provider,
            id:        data.google.id,
            email:     data.google.email,
            name:      data.google.displayName,
            picture:   data.google.profileImageURL,
            link:      data.google.cachedUserProfile.link,
            locale:    data.google.cachedUserProfile.locale
          }

          UserLogin.successLogin(session, profile)
          deferred.resolve(profile)
        }
        Firebase.goOffline()
      }, { scope: 'email' })

      return deferred.promise
    }

    return UserLogin
  }
// jscs:disable disallowSemicolons
})();
