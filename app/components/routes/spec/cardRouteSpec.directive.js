'use strict'

describe('Directive: cardRoute', function() {

  // load the directive's module
  beforeEach(module('climbingMemo'))
  beforeEach(module('templates'))

  var element, scope, httpBackend, templateCache

  beforeEach(inject(function($rootScope, $httpBackend, $templateCache,
  $compile) {
    scope = $rootScope.$new()
    httpBackend = $httpBackend
    templateCache = $templateCache

    httpBackend.whenGET('components/routes/views/_cardRoute.html')
      .respond(templateCache.get('/components/routes/views/_cardRoute.html'))

    httpBackend.whenGET('components/routes/views/_routeSummary.html').respond('')
    httpBackend.whenGET('components/routes/views/_routeNotes.html').respond('')
    httpBackend.whenGET('components/routes/views/_routeMedia.html').respond('')
    httpBackend.whenGET('components/routes/views/_routeAscents.html').respond('')
    httpBackend.whenGET('components/routes/views/_routeBuilder.html').respond('')

    element = $compile('<card-route></card-route>')(scope)

    httpBackend.flush()
  }))

  it('should contain tabs array', function() {
    expect(scope.tabs).toBeDefined()
    expect(scope.tabs.length).toBeGreaterThan(0)
  })
})
