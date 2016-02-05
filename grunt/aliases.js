module.exports = {
  'default': [
    'newer:jshint',
    'newer:jscs',
    'test',
    'build'
  ],
  'test': [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'unit-test',
    'e2e-test'
  ],
  'e2e-test': [
    'connect:test',
    'protractor:local'
  ],
  'unit-test': [
    'jscs',
    'jshint',
    'karma',
    'coveralls'
  ],
  'full-test': [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'unit-test',
    'connect:test',
    'protractor:sauceLab'
  ],
  'bundle': [
    'clean:bundle',
    'copy:bundle',
    'ngtemplates:bundleTimeline',
    'ngtemplates:bundleTable',
    'ngtemplates:bundleMap',
    'ngtemplates:bundleCharts',
    'concat:bundle',
    'uglify:bundle',
    'compass',
    'cssmin:bundle'
  ],
  'build': [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'ngtemplates',
    'ngconstant',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    // 'uglify',
    // 'filerev',
    'usemin',
    'htmlmin',
    'manifest'
  ]
}
