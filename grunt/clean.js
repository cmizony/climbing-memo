module.exports = {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%= path.dist %>/**/*',
        'coveralls',
        'manifest.appcache',
        'app/components/core/core.config.js',
        '!<%= path.dist %>/.git**/*'
      ]
    }]
  },
  server: '.tmp'
}
