module.exports = {
  dist: {
    options: {
      module: 'siurana',
      htmlmin: '<%= options.htmlmin %>',
      usemin: 'scripts/scripts.js'
    },
    cwd: 'app/',
    src: 'views/**/*.html',
    dest: '.tmp/templateCache.js'
  },
  bundle: {
    options: {
      module: 'siurana',
      htmlmin: '<%= options.htmlmin %>',
      bootstrap:  function(module, script) {
        return '(function() {' +
          'angular.module("' + module + '",' +
          '["siurana.table", "siurana.timeline", "siurana.map", "siurana.charts"])' +
          '.run([\'$templateCache\', function($templateCache) {' +
          script + '}])' + '})()'
      }
    },
    cwd: '<%= path.app %>',
    src: 'components/**/*.html',
    dest: '.tmp/templateCache/siurana.js'
  }
}
