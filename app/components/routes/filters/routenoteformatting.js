(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.filter:routeNoteFormatting
  * @description
  * # routeNoteFormatting
  * Filter in the siuranaRoutes.
  */
  angular.module('siurana.routes')
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
      return input ? input : '**Notes:**\n\n---\n'
    }
  }
// jscs:disable disallowSemicolons
})();
