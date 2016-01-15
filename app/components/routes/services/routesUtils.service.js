(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.service:RoutesUtilsSvc
  * @description
  * Service in the climbingMemoRoutes
  */
  angular.module('climbingMemo.routes')
  .service('RoutesUtilsSvc', RoutesUtilsSvc)

  RoutesUtilsSvc.$inject = []

  function RoutesUtilsSvc() {
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
      return route.status === 'Attempt' ? 'fa-times' : 'fa-check'
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

    return RoutesUtils
  }
// jscs:disable disallowSemicolons
})();
