module.exports = {
  options: {
    port: '<%= options.port %>',
    hostname: '<%= options.hostname %>',
    livereload: '<%= options.livereload %>'
  },
  livereload: {
    options: {
      open: true,
      middleware: function(connect) {
        return [
          connect.static('.tmp'),
          connect().use(
            '/bower_components',
            connect.static('./bower_components')
          ),
          connect().use(
            '/app/styles',
            connect.static('./app/styles')
          ),
          connect.static('app')
        ]
      }
    }
  },
  test: {
    options: {
      port: 9001,
      middleware: function(connect) {
        return [
          connect.static('.tmp'),
          connect.static('test'),
          connect().use(
            '/bower_components',
            connect.static('./bower_components')
          ),
          connect.static('app')
        ]
      }
    }
  },
  dist: {
    options: {
      open: true,
      base: '<%= path.dist %>'
    }
  }
}
