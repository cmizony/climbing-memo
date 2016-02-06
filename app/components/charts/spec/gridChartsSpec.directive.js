'use strict'

describe('Directive: gridCharts', function() {

  beforeEach(module('templates'))
  beforeEach(angular.mock.module('siurana.charts'))

  var element, scope
  beforeEach(inject(function($rootScope, $httpBackend, $templateCache,
  $compile) {

    scope = $rootScope.$new()
    $httpBackend.whenGET('components/charts/views/_gridCharts.html')
    .respond($templateCache.get('/components/charts/views/_gridCharts.html'))

    element = angular.element('<grid-charts></grid-charts>')
    $compile(element)(scope)

    $httpBackend.flush()
    scope.$digest()
    scope = element.isolateScope()
  }))

  it('should compile', function() {
    expect(element).toBeDefined()
  })
})
