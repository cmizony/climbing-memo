'use strict'

/**
* @module climbingMemo
* @name climbingMemo.filter:routeNoteFormatting
* @description
* # routeNoteFormatting
* Filter in the climbingMemo.
*/
angular.module('climbingMemo')
.filter('routeNoteFormatting', function() {
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
})
