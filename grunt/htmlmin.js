module.exports = {
  dist: {
    options: {
      collapseWhitespace: true,
      conservativeCollapse: true,
      collapseBooleanAttributes: true,
      removeCommentsFromCDATA: true
    },
    files: [{
      expand: true,
      cwd: '<%= path.dist %>',
      src: ['*.html'],
      dest: '<%= path.dist %>'
    }]
  }
}
