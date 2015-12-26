module.exports = {
  dist: {
    options: {
      module: 'climbingMemo',
      htmlmin: '<%= options.htmlmin %>',
      usemin: 'scripts/scripts.js'
    },
    cwd: 'app/',
    src: 'views/**/*.html',
    dest: '.tmp/templateCache.js'
  }
}
