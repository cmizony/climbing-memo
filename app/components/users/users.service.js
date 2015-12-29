(function() {
  'use strict'

  /**
  * @module climbingMemoUsers
  * @name climbingMemoUsers.service:UsersSvc
  * @description
  * # UsersSvc
  * Service of the climbingMemoUsers
  */
  angular.module('climbingMemo.users')
  .service('UsersSvc', usersService)

  usersService.$inject = [
    '$http',
    'Auth',
    'APP_CONFIG'
  ]

  function usersService($http, Auth, APP_CONFIG) {
    var Users = {}

    /**
    * Dynamically generate database URL
    *
    * @TODO add http interceptors
    * @param {String} uri
    * @return {String} url
    */
    Users.getUrl = function(uri) {
      var session = Auth.getSession()
      var tokenParam = session.token ? '?auth=' + session.token : ''
      return APP_CONFIG.url + 'users/' + uri + tokenParam
    }

    /**
    * Request a profile form database
    *
    * @param {String} uid
    * @return {Object} promise
    */
    Users.getProfile = function(uid) {
      return $http.get(Users.getUrl(uid + '/profile.json'))
    }

    /**
    * Create or Update a user profile to the database
    *
    * @param {String} uid
    * @param {Object} profile
    * @return {Object} promise
    */
    Users.updateProfile = function(uid, profile) {
      return $http.put(Users.getUrl(uid + '/profile.json'), profile)
    }

    return Users
  }
// jscs:disable disallowSemicolons
})();
