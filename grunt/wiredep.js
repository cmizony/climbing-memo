module.exports = {
  app: {
    src: ['<%= path.app %>/index.html'],
    ignorePath:  /\.\.\//
  },
  test: {
    devDependencies: true,
    src: '<%= path.karmaConf %>',
    ignorePath:  /\.\.\//,
      fileTypes:{
        js: {
          block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
          detect: {
            js: /'(.*\.js)'/gi
          },
          replace: {
            js: '\'{{filePath}}\','
          }
        }
      }
  },
  sass: {
    src: ['<%= path.app %>/styles/**/*.{scss,sass}'],
    ignorePath: /(\.\.\/){1,2}bower_components\//
  }
}
