module.exports = {
  dist: {
    src: [
      '<%= path.dist %>/scripts/**/*.js',
      '<%= path.dist %>/components/**/*.js',
      '<%= path.dist %>/styles/**/*.css',
      '<%= path.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
      '<%= path.dist %>/styles/fonts/*'
    ]
  }
}
