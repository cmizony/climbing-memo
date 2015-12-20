exports.config = {
  capabilities: {
    'browserName': 'chrome',
    'name': 'Climbing-memo Chrome'
  },

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
