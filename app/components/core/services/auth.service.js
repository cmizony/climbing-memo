(function() {
  'use strict'

  /**
  * @module climbingMemoCore
  * @name climbingMemoCore.service:Auth
  * @description
  * # Auth
  */
  angular.module('climbingMemo.core')
  .service('Auth', authService)

  authService.$inject = [
    '$localStorage'
  ]

  function authService($localStorage) {
    var Auth = {}

    /**
    * Authentication session
    * @typedef session
    * @type {object}
    * @property {string} uid
    * @property {string} token
    * @property {number} expires - UTC
    * @property {string} provider
    */

    /**
    * Create auth session in memory
    * @method createSession
    * @param {Object} session
    */
    Auth.createSession = function(session) {
      $localStorage.mySession = session
    }

    /**
    * Delete current session
    * @method deleteSession
    */
    Auth.deleteSession = function() {
      delete $localStorage.mySession
    }

    /**
    * Get current session
    * @method getSession
    * @return {session}
    */
    Auth.getSession = function() {
      return $localStorage.mySession || {}
    }

    /**
    * Returns true if user has a valid active session
    * @method isLoggedIn
    * @return {boolean}
    */
    Auth.isLoggedIn = function() {
      var session = Auth.getSession()
      var currentUTC = new Date().getTime() / 1000
      return session.token && session.expires > currentUTC
    }

    /**
     * Retrieve session token if exists
     * @method getToken
     * @return {String|Boolean} token
     */
    Auth.getToken = function() {
      if (Auth.isLoggedIn()) {
        return Auth.getSession().token
      }
      return false
    }

    return Auth
  }
// jscs:disable disallowSemicolons
})();
