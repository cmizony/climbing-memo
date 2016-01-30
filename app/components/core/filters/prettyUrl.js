(function() {
  'use strict'

  /**
  * @module climbingMemoCore
  * @name climbingMemoCore.filter:prettyUrl
  * @description
  * # prettyUrl
  * Filter in the climbingMemoCore
  */
  angular.module('climbingMemo.core')
  .filter('prettyUrl', prettyUrlFilter)

  prettyUrlFilter.$inject = [
    'Utils'
  ]

  function prettyUrlFilter(Utils) {
    /**
    * Format url with hostname and pathname
    * @method prettyUrl
    * @throws {String} Not valid URL
    * @param {String} link
    * @param {String} maxChar
    * @returns {String}
    */
    return function(link, maxChar) {
      var url = Utils.parseHref(link)
      if (!url) {
        return _.trunc(link, maxChar)
      }

      maxChar = maxChar || Number.MAX_VALUE

      var prettyUrl = url.host + url.pathname + (url.search || '')
      prettyUrl = prettyUrl.replace(/^www\./, '')

      return _.trunc(prettyUrl, maxChar)
    }
  }
// jscs:disable disallowSemicolons
})();
