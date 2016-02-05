module.exports = {
  dist: {
    options: {
      module: 'siurana',
      htmlmin: '<%= options.htmlmin %>',
      usemin: 'scripts/scripts.js'
    },
    cwd: 'app/',
    src: 'views/**/*.html',
    dest: '.tmp/templateCache.js'
  },
  bundleTimeline: {
    options: {
      module: 'siurana.timeline',
      htmlmin: '<%= options.htmlmin %>'
    },
    cwd: '<%= path.app %>',
    src: 'components/timeline/views/**/*.html',
    dest: '.tmp/templateCache/timeline.js'
  },
  bundleTable: {
    options: {
      module: 'siurana.table',
      htmlmin: '<%= options.htmlmin %>'
    },
    cwd: '<%= path.app %>',
    src: 'components/table/views/**/*.html',
    dest: '.tmp/templateCache/table.js'
  },
  bundleMap: {
    options: {
      module: 'siurana.map',
      htmlmin: '<%= options.htmlmin %>'
    },
    cwd: '<%= path.app %>',
    src: 'components/map/views/**/*.html',
    dest: '.tmp/templateCache/map.js'
  },
  bundleCharts: {
    options: {
      module: 'siurana.charts',
      htmlmin: '<%= options.htmlmin %>'
    },
    cwd: '<%= path.app %>',
    src: 'components/charts/views/**/*.html',
    dest: '.tmp/templateCache/charts.js'
  },
}
