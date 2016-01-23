'use strict'

describe('Directive: routeSummary', function() {

  // load the directive's module
  beforeEach(module('templates'))
  beforeEach(module('climbingMemo'))

  var element, scope, httpBackend, templateCache, RoutesUtilsSvc

  beforeEach(inject(function($rootScope, $httpBackend, $templateCache,
  $compile, _RoutesUtilsSvc_) {
    scope = $rootScope.$new()
    httpBackend = $httpBackend
    templateCache = $templateCache
    RoutesUtilsSvc = _RoutesUtilsSvc_

    httpBackend.whenGET('components/routes/views/_routeSummary.html')
      .respond(templateCache.get('/components/routes/views/_routeSummary.html'))

    spyOn(RoutesUtilsSvc, 'getIconStatus')
    spyOn(RoutesUtilsSvc, 'getIconRock')
    spyOn(RoutesUtilsSvc, 'getIndoorLabel')
    spyOn(RoutesUtilsSvc, 'getTypeColor')

    element = $compile('<route-summary></route-summary>')(scope)

    httpBackend.flush()
  }))

  it('should map function to RoutesUtilsSvc', function() {
    expect(RoutesUtilsSvc.getIconStatus).toHaveBeenCalled()
    expect(RoutesUtilsSvc.getIconRock).toHaveBeenCalled()
    expect(RoutesUtilsSvc.getIndoorLabel).toHaveBeenCalled()
    expect(RoutesUtilsSvc.getTypeColor).toHaveBeenCalled()
  })
})
