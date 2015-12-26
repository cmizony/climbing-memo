module.exports = {
  dist: {
    src: [
      '<%= path.app %>/scripts/**/*.js',
      '<%= path.app %>/components/**/*.js'
    ],
    options: {
      destination: 'dist/doc',
      readme: 'README.md',
      template: 'node_modules/ink-docstrap/template',
      configure: 'jsdoc.conf.json'
    }
  }
}
