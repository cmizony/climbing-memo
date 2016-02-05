(function() {
  'use strict'

  /**
  * @module siuranaUsers
  * @name siuranaUsers.service:UserLoginSvc
  * @description
  * # UserLoginSvc
  */
  angular.module('siurana.users')
  .service('UserLoginSvc', userLoginService)

  userLoginService.$inject = [
    '$log',
    '$q',
    '$location',
    'UsersSvc',
    'Auth',
    'APP_CONFIG'
  ]

  function userLoginService($log, $q, $location, UsersSvc, Auth,
  APP_CONFIG) {
    var UserLogin = {}
    UserLogin.firebase = new Firebase(APP_CONFIG.url)

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
      $location.path('/timeline')
    }

    /**
    * Remove local session, invalidate the token and redirect to home page
    *
    * @method logOut
    */
    UserLogin.logOut = function() {
      Auth.deleteSession()
      UserLogin.firebase.unauth()
      $location.path('/')
    }

    /**
    * Handle OAuth callback for any provider
    *
    * @method oauthSuccessCallback
    * @private
    * @param {Object} error
    * @param {Object} data
    * @param {Object} deferred
    */
    UserLogin.oauthSuccessCallback = function(error, data, deferred) {
      if (error) {
        $log.debug('Google authentication failed')
        deferred.reject(error)
      } else {
        var provider = data.provider
        var session = {
          uid:       data.uid,
          token:     data.token,
          expires:   data.expires,
          provider:  data.provider,
          name:      data[provider].displayName
        }
        var profile = {
          uid:       data.uid,
          provider:  data.provider,
          id:        data[provider].id,
          email:     data[provider].email,
          name:      data[provider].displayName,
          picture:   data[provider].profileImageURL,
          link:      data[provider].cachedUserProfile.link,
          locale:    data[provider].cachedUserProfile.locale
        }

        Firebase.goOffline()
        deferred.resolve(profile)
        UserLogin.successLogin(session, profile)
      }
    }

    /**
    * Prompt the user to login and then invoke the google login popup
    *
    * @return {Object} promise that resolve to profile info
    */
    UserLogin.googleSignIn = function() {
      var deferred = $q.defer()

      UserLogin.firebase.authWithOAuthPopup('google', function(error, data) {
        UserLogin.oauthSuccessCallback(error, data, deferred)
      }, { scope: 'email' })

      return deferred.promise
    }

    return UserLogin
  }
// jscs:disable disallowSemicolons
})();
