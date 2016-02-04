'use strict'

describe('Directive: cardRoute', function() {

  // load the directive's module
  beforeEach(module('climbingMemo'))

  var element, scope, httpBackend

  beforeEach(inject(function($rootScope, $httpBackend, $templateCache,
  $compile) {
    scope = $rootScope.$new()
    httpBackend = $httpBackend

    httpBackend.whenGET('components/routes/views/_cardRoute.html')
      .respond('')

    element = $compile('<card-route></card-route>')(scope)

    httpBackend.flush()
  }))

  it('should contain tabs array', function() {
    expect(scope.tabs).toBeDefined()
    expect(scope.tabs.length).toBeGreaterThan(0)
  })
})
