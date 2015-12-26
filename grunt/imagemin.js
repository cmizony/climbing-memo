module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= path.app %>/images',
      src: '**/*.{png,jpg,jpeg,gif}',
      dest: '<%= path.dist %>/images'
    }]
  }
}
