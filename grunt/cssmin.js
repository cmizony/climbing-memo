module.exports = {
  dist: {
    files: {
      '<%= path.dist %>/styles/main.css': [
        '.tmp/styles/**/*.css'
      ]
    }
  },
  bundle: {
    files: {
      '<%= path.bundle %>/siurana.min.css': [
        '.tmp/styles/**/*.css'
      ]
    }
  }
}
