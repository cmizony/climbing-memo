module.exports = {
  src: [
    'Gruntfile.js',
    '<%= path.app %>/components/**/*.js',
    '!<%= path.app %>/components/core/core.config.js',
    '<%= path.app %>/scripts/**/*.js',
    '<%= path.test %>/**/*.js'
  ],
  options: {
    config: '.jscsrc'
  }
}
