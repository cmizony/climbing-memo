describe('timeline page', function() {
  it('should contain main widget', function() {
    browser.get(browser.params.url)

    var widget = element(by.css('.climb-timeline'))

    expect(widget.isPresent()).toBe(true)
  })
})
