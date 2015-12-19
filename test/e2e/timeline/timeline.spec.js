var TimelinePage = require('./timeline.js')

describe('timeline page', function() {
  var page = new TimelinePage()
  var testRoute = getTestRoute()
  page.get()

  function getTestRoute() {
    // Get random name
    var array = 'qwertyupvbnm'.split(''), i = 0, j = 0, temp = null
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 0))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }

    // Return route
    return {
      name: array.join(''),
      grade: '5.10a',
      sector: 'Mortar',
      type: 'Boulder',
      rock: 'Granite',
      location: 'San Francisco, CA'
    }
  }

  it('should contain timeline widget', function() {
    expect(page.timeline.isPresent()).toBe(true)
  })

  it('should add a route', function() {
    // Select the bucket
    page.setBucket('e2e')
    page.bucketButton.click()

    // Add a route
    page.btnAdd.click()
    expect(page.routeModal.isPresent()).toBe(true)

    page.enterRoute(testRoute)
    page.saveRoute.click().then(function() {
      var routeElement = element(by.partialLinkText(testRoute.name))
      expect(routeElement.getText()).toEqual(testRoute.name)
    })
  })
})
