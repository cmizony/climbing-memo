var TimelinePage = function() {
  var page = this

  page.timeline = element(by.css('.climb-timeline'))
  page.btnAdd = element(by.css('.climb-add button'))

  page.routeModal = element(by.css('.route-modal'))
  page.routeModalSave = element(by.partialButtonText('Save'))
  page.routeModalDelete = element(by.css('.e2e-route .e2e-delete'))

  page.bucketButton = element(by.css('.e2e-bucket button'))
  page.bucketInput = element(by.model('bucketName'))

  /**
  * @TODO Click from navbar
  */
  page.get = function() {
    browser.get(browser.params.url)
  }

  page.setBucket = function(name) {
    page.bucketInput.clear()
    return page.bucketInput.sendKeys(name)
  }

  page.getRoute = function(route) {
    return element(by.partialLinkText(route.name))
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
