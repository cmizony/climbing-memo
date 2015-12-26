module.exports = {
  options: {
    sassDir: '<%= path.app %>/styles',
    cssDir: '.tmp/styles',
    generatedImagesDir: '.tmp/images/generated',
    imagesDir: '<%= path.app %>/images',
    javascriptsDir: '<%= path.app %>/scripts',
    fontsDir: '<%= path.app %>/styles/fonts',
    importPath: './bower_components',
    httpImagesPath: '/images',
    httpGeneratedImagesPath: '/images/generated',
    httpFontsPath: '/styles/fonts',
    relativeAssets: false,
    assetCacheBuster: false,
    raw: 'Sass::Script::Number.precision = 10\n'
  },
  dist: {
    options: {
      generatedImagesDir: '<%= path.dist %>/images/generated'
    }
  },
  server: {
    options: {
      sourcemap: true
    }
  }
}
