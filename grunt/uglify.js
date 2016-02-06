module.exports = {
// dist: {
//   files: {
//     'dist/scripts/scripts.js': [
//       'dist/scripts/scripts.js'
//     ]
//   }
// },
  bundle: {
    files: {
      '<%= path.bundle %>/siurana.min.js': ['<%= path.bundle %>/siurana.js']
    }
  }
}
