'use strict'

describe('Directive: mainNavbar', function() {

  // load the directive's module
  beforeEach(module('siurana.core'))
  beforeEach(module('templates'))

  var element, scope, httpBackend, templateCache

  beforeEach(inject(function($rootScope, $httpBackend, $templateCache) {
    scope = $rootScope.$new()
    httpBackend = $httpBackend
    templateCache = $templateCache
  }))

  it('should get #templateUrl', inject(function($compile) {
    httpBackend.whenGET('components/core/views/_mainNavbar.html')
      .respond(templateCache.get('/components/core/views/_mainNavbar.html'))
    httpBackend.whenGET('components/users/views/_userLogin.html').respond('')

    element = $compile('<main-navbar></main-navbar>')(scope)

    httpBackend.flush()
  }))
})
