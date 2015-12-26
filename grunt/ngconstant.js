module.exports = {
  options: {
    dest: '<%= path.app %>/components/core/core.config.js',
    deps: false,
    name: 'climbingMemo.core',
    wrap: '// jscs:disable\n(function() {\n{%= __ngModule %} })();'
  },
  dist: {
    constants: {
      APP_CONFIG: {
        protocol: '<%= options.server.protocol %>',
        dns:      '<%= options.server.dns %>',
        version:  '<%= options.server.version %>',
        url:      '<%= options.server.protocol %>://' +
          '<%= options.server.dns %>/' +
          '<%= options.server.version %>/'
      }
    }
  }
}
