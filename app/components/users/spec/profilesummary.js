'use strict'

describe('Directive: profileSummary', function() {

  // load the directive's module
  beforeEach(module('climbingMemo'))
  beforeEach(module('templates'))

  var element, scope, httpBackend, templateCache

  beforeEach(inject(function($rootScope, $httpBackend, $templateCache) {
    scope = $rootScope.$new()
    httpBackend = $httpBackend
    templateCache = $templateCache
  }))

  it('should get #templateUrl', inject(function($compile) {
    httpBackend.expectGET('components/users/views/_profileSummary.html')
    httpBackend.whenGET('components/users/views/_profileSummary.html')
      .respond(templateCache.get('/components/users/views/_profileSummary.html'))

      element = $compile('<profile-summary></profile-summary>')(scope)

    httpBackend.flush()
  }))
})
