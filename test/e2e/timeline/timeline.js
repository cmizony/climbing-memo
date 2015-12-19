var TimelinePage = function() {
  var page = this

  page.timeline = element(by.css('.climb-timeline'))
  page.btnAdd = element(by.css('.climb-add button'))
  page.routeModal = element(by.css('.route-modal'))
  page.saveRoute = element(by.partialButtonText('Save'))

  page.bucketButton = element(by.css('.bucket-actions button'))
  page.bucketInput = element(by.model('bucketName'))

  page.get = function() {
    browser.get(browser.params.url)
    // TODO nav bar + click
  }

  page.generateName

  page.setBucket = function(name) {
    page.bucketInput.clear()
    return page.bucketInput.sendKeys(name)
  }

  page.enterRoute = function(route) {
    element(by.model('route.name')).sendKeys(route.name)
    element(by.model('route.grade')).sendKeys(route.grade)
    element(by.model('route.sector')).sendKeys(route.sector)
    element(by.cssContainingText('option',route.type)).click()
    element(by.cssContainingText('option',route.rock)).click()
    element(by.model('route.location')).sendKeys(route.location)
  }
}

module.exports = TimelinePage
