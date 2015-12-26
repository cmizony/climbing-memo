module.exports = {
  html: '<%= path.app %>/index.html',
  options: {
    dest: 'dist/',
    flow: {
      html: {
        steps: {
          js: ['concat'],
          css: ['cssmin']
        },
        post: {}
      }
    }
  }
}
