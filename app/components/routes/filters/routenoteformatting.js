(function() {
  'use strict'

  /**
  * @module climbingMemoRoutes
  * @name climbingMemoRoutes.filter:routeNoteFormatting
  * @description
  * # routeNoteFormatting
  * Filter in the climbingMemoRoutes.
  */
  angular.module('climbingMemo.routes')
  .filter('routeNoteFormatting', routeNoteFormattingFilter)

  routeNoteFormattingFilter.$inject = []

  function routeNoteFormattingFilter() {
    /**
    * Add placeholder description
    * @method routeNoteFormatting
    * @param {String} input
    * @returns {String}
    * @example
    * var routeName = ''
    * var output = routeNoteFormatting(routeName)
    * // output contains: ```\nReminder\n``` [...]
    */
    return function(input) {
      return input ? input : '```\nReminder:\n```\n\n**Description**\n\n> \n\n----\n'
    }
  }
// jscs:disable disallowSemicolons
})();
