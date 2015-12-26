module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= path.app %>/images',
      src: '**/*.svg',
      dest: '<%= path.dist %>/images'
    }]
  }
}
