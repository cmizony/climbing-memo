module.exports = {
  generate: {
    options: {
      basePath: '<%= path.dist %>',
      cache: [
        'index.html',
        'fonts/glyphicons-halflings-regular.woff2',
        'fonts/glyphicons-halflings-regular.woff',
        'fonts/glyphicons-halflings-regular.ttf',
        'fonts/fontawesome-webfont.ttf?v=4.4.0',
        'fonts/fontawesome-webfont.woff?v=4.4.0',
        'fonts/fontawesome-webfont.woff2?v=4.4.0',
        'styles/main.css',
        'styles/vendor.css',
        'scripts/vendor.js',
        'scripts/scripts.js'
      ],
      network: ['*'],
      fallback: ['/ /offline.html'],
      exclude: ['manifest.appcache'],
      preferOnline: true,
      verbose: true,
      timestamp: true,
      hash: true,
      master: ['index.html']
    },
    src: [
      'components/**/*.js',
      'components/**/*.html',
      'scripts/**/*.js',
      'styles/**/*.css',
      'views/**/*.html'
    ],
    dest: 'manifest.appcache'
  }
}
