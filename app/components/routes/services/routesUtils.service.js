(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.service:RoutesUtilsSvc
  * @description
  * Service in the climbingMemoRoutes
  */
  angular.module('climbingMemo.routes')
  .service('RoutesUtilsSvc', RoutesUtilsService)

  RoutesUtilsService.$inject = [
    'Utils'
  ]

  /**
   * @typedef Media
   * @type {Object}
   * @property {String} provider
   * @property {String} color
   * @property {String} link
   * @property {String} header
   */
  function RoutesUtilsService(Utils) {
    var RoutesUtils = {}

    /**
    * Get icon based on route status
    *
    * @method getIconStatus
    * @param {Object} route
    * @return {String}
    */
    RoutesUtils.getIconStatus = function(route) {
      if (!(route && route.status)) {
        return 'fa-connectdevelop'
      }
      return route.status === 'Attempt' ? 'fa-square-o' : 'fa-check-square-o'
    }

    /**
    * Get icon based on route rock
    *
    * @method getIconRock
    * @param {Object} route
    * @return {String}
    */
    RoutesUtils.getIconRock = function(route) {
      if (!(route && route.rock)) {
        return 'fa-connectdevelop'
      }
      return route.rock === 'Indoor' ? 'fa-home' : 'fa-sun-o'
    }

    /**
    * Get Indoor label based on route rock
    *
    * @method getIndoorLabel
    * @param {Object} route
    * @return {String}
    */
    RoutesUtils.getIndoorLabel = function(route) {
      return route.rock === 'Indoor' ? 'Indoor' : 'Outdoor'
    }

    /**
    * Get route color based on type
    *
    * @method getTypeColor
    * @param {Object} Route
    *
    * @return {String} Css color
    */
    RoutesUtils.getTypeColor = function(route) {
      switch (route.type) {
        case 'Sport lead':	return 'gold'
        case 'Boulder':		return 'lightskyblue'
        case 'Traditional':	return 'yellowgreen'
        case 'Multi-pitch':	return 'darkorange'
        case 'Top rope':	return 'lightgray'
        default:			return 'lightgray'
      }
    }

    /**
    * Create route media object from a url
    *
    * @method getRouteMedia
    * @param {String} link
    *
    * @return {Media} media
    */
    RoutesUtils.getRouteMedia = function(link) {
      var media = {
        provider:  'question-circle',
        color:     'text-muted',
        link:      link
      }

      var url = Utils.parseHref(link)
      if (!url) {
        return media
      }

      var hostname = url.hostname

      if (_.contains(hostname, 'youtube')) {
        media.provider = 'youtube'
        media.color    = 'text-danger'
        media.header   = 'Youtube video'
      } else if (_.contains(hostname, 'instagram')) {
        media.provider = 'instagram'
        media.color    = 'text-primary'
        media.header   = 'Instagram photo'
      } else if (_.contains(hostname, 'vimeo')) {
        media.provider = 'vimeo'
        media.color    = 'text-success'
        media.header   = 'Vimeo video'
      } else if (_.contains(hostname, 'flickr')) {
        media.provider = 'flickr'
        media.color    = ''
        media.header   = 'Flickr photos'
      }
      return media
    }

    /**
    * Validate a route media link
    *
    * @method isValidRouteMedia
    * @param {String} link
    * @return {Boolean}
    */
    RoutesUtils.isValidRouteMedia = function(link) {
      return RoutesUtils.getRouteMedia(link).provider !== 'question-circle'
    }

    return RoutesUtils
  }
// jscs:disable disallowSemicolons
})();
