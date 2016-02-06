module.exports = {
  dist: {},
  bundle: {
    src: [
      '<%= path.app %>/components/**/*.js',
      '!<%= path.app %>/components/*/spec/**/*.js',
      '.tmp/templateCache/*.js'
    ],
    dest: '<%= path.bundle %>/siurana.js'
  }
}
