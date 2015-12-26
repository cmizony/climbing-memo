module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= path.app %>',
      dest: '<%= path.dist %>',
      src: [
        '*.{ico,png,txt}',
        '**/*.js',
        '**/*.html',
        'images/**/*.{webp}',
        'styles/fonts/**/*.*'
      ]
    }, {
      expand: true,
      cwd: '.tmp/images',
      dest: '<%= path.dist %>/images',
      src: ['generated/*']
    }, {
      expand: true,
      cwd: 'bower_components/bootstrap/dist',
      src: 'fonts/*',
      dest: '<%= path.dist %>'
    }, {
      expand: true,
      cwd: 'bower_components/components-font-awesome',
      src: 'fonts/*',
      dest: '<%= path.dist %>'
    }]
  },
  styles: {
    expand: true,
    cwd: '<%= path.app %>/styles',
    dest: '.tmp/styles/',
    src: '**/*.css'
  }
}
