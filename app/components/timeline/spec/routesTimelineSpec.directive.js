'use strict'

describe('Directive: routesTimeline', function() {

  beforeEach(module('templates'))
  beforeEach(angular.mock.module('siurana.timeline'))

  var element, scope
  beforeEach(inject(function($rootScope, $httpBackend, $templateCache,
  $compile) {

    scope = $rootScope.$new()
    $httpBackend.whenGET('components/timeline/views/_routesTimeline.html')
    .respond($templateCache.get('/components/timeline/views/_routesTimeline.html'))

    element = angular.element('<routes-timeline></routes-charts>')
    $compile(element)(scope)

    $httpBackend.flush()
    scope.$digest()
    scope = element.isolateScope()
  }))

  it('should compile', function() {
    expect(element).toBeDefined()
  })
})
