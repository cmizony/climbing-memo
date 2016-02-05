(function() {
  'use strict'

  /**
  * @module siuranaCore
  * @name siuranaCore.service:Utils
  * @description
  * Javascript utils function
  */
  angular.module('siurana.core')
  .service('Utils', UtilsService)

  UtilsService.$inject = [
  ]

  function UtilsService() {
    var Utils = {}

    /**
    * URL object
    * @typedef url
    * @type {object}
    * @property {string} protocol
    * @property {string} host
    * @property {string} hostname
    * @property {string} port
    * @property {string} pathname
    * @property {string} search
    * @property {string} hash
    */

    /**
    * Extract url details from string
    * @method parseHref
    * @param {String} href
    * @return {url|Boolean} - False if error
    */
    Utils.parseHref = function(href) {
      if (!_.isString(href)) {
        return false
      }

      var match = href
      .match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/)
      return match && {
        protocol:  match[1],
        host:      match[2],
        hostname:  match[3],
        port:      match[4],
        pathname:  match[5],
        search:    match[6],
        hash:      match[7]
      }
    }

    return Utils
  }
// jscs:disable disallowSemicolons
})();
