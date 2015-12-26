module.exports = {
  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  },
  js: {
    files: [
      '<%= path.app %>/scripts/**/*.js',
      '<%= path.app %>/components/**/*.js'
    ],
    tasks: ['newer:jshint:all', 'newer:jscs'],
    options: {
      livereload: '<%= options.livereload %>'
    }
  },
  jsTest: {
    files: ['test/unit/**/*.js'],
    tasks: ['newer:jshint:test', 'newer:jscs', 'karma']
  },
  compass: {
    files: ['<%= path.app %>/styles/**/*.{scss,sass}'],
    tasks: ['compass:server', 'autoprefixer:server']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    options: {
      livereload: '<%= options.livereload %>'
    },
    files: [
      '<%= path.app %>/**/*.html',
      '.tmp/styles/**/*.css',
      '<%= path.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
    ]
  }
}
