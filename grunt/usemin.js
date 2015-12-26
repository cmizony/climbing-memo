module.exports = {
  html: ['<%= path.dist %>/**/*.html'],
  css: ['<%= path.dist %>/styles/**/*.css'],
  js: [
    '<%= path.dist %>/scripts/**/*.js',
    '<%= path.dist %>/components/**/*.js'
  ],
  options: {
    assetsDirs: [
      '<%= path.dist %>',
      '<%= path.dist %>/images',
      '<%= path.dist %>/styles'
    ],
    patterns: {
      js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g,
      'Replacing references to images']]
    }
  }
}
