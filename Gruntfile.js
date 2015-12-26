'use strict'

module.exports = function(grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt)

  // Automatically load required Grunt tasks
  var config = require('load-grunt-config')(grunt, {
		data: {
      path: {
        app: 'app',
        dist: 'dist',
        test: 'test',
        doc: 'dist/doc',
        karmaConf: 'test/karma.conf.js'
      },
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729,
        htmlmin: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        }
      }
    },
    jitGrunt: {
      staticMappings: {
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        cdnify: 'grunt-google-cdn',
        coveralls: 'grunt-karma-coveralls',
        protractor: 'grunt-protractor-runner',
        versioncheck: 'grunt-version-check'
      }
    }
  })

  // config.uglify = {
  //   dist: {
  //     files: {
  //       'dist/scripts/scripts.js': [
  //         'dist/scripts/scripts.js'
  //       ]
  //     }
  //   }
  // }

  grunt.initConfig(config)

  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive'])
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ])
  })

  grunt.registerTask('help', 'Display some helpful information if no task provided', function() {
    this.async()
    grunt.util.spawn({
      grunt: true, args: ['--help']}, function(e, r) {
        grunt.log.writelns(r, '\n')
      })
  })
}
