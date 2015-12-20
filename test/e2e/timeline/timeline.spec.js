var TimelinePage = require('./timeline.js')

describe('timeline page', function() {
  var page = new TimelinePage()
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

  describe('CRUD routes', function() {
    var testRoute = getTestRoute()

    it('should add a route', function() {
      page.setBucket('e2e')
      page.bucketButton.click()

      page.btnAdd.click()
      expect(page.routeModal.isPresent()).toBe(true)

      page.enterRoute(testRoute)
      page.routeModalSave.click().then(function() {
        expect(page.getRoute(testRoute).isPresent()).toBe(true)
        expect(page.getRoute(testRoute).getText()).toEqual(testRoute.name)
      })
    })

    it('should delete a route', function() {
      page.getRoute(testRoute).click()
      page.routeModalDelete.click().then(function() {
        expect(page.routeModal.isPresent()).toBe(false)
        expect(page.getRoute(testRoute).isPresent()).toBe(false)
      })
    })
  })
})
