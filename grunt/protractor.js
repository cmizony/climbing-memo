module.exports = {
  options: {
    keepAlive: false,
    noColor: false
  },
  local: {
    options: {
      configFile: '<%= path.test %>/e2e/protractor.conf.js'
    }
  },
  sauceLab: {
    options: {
      configFile: '<%= path.test %>/e2e/protractorSauceLab.conf.js',
      args: {
        sauceUser: process.env.SAUCE_USERNAME,
        sauceKey: process.env.SAUCE_ACCESS_KEY
      }
    }
  }
}
