module.exports.tasks = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  all: {
    src: [
      'Gruntfile.js',
      '<%= path.app %>/components/**/*.js',
      '<%= path.app %>/scripts/**/*.js'
    ]
  },
  test: {
    options: {
      jshintrc: '.jshintrc'
    },
    src: ['test/**/*.js']
  }
}
