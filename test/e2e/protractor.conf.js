exports.config = {
  specs: [
    '**/*.spec.js'
  ],

  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true
  },

  params: {
    url: 'http:localhost:9001'
  }
}
