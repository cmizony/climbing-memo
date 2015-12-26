module.exports = {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%= path.dist %>/**/*',
        '!<%= path.dist %>/.git**/*'
      ]
    }]
  },
  server: '.tmp'
}
