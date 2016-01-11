'use strict'

describe('Directive: sliderCharts', function() {

  // load the directive's module
  beforeEach(module('climbingMemo.charts'))
  beforeEach(module('templates'))

  var element, scope, httpBackend, templateCache, timeout

  beforeEach(inject(function($rootScope, $httpBackend, $templateCache, $timeout) {
    scope = $rootScope.$new()
    httpBackend = $httpBackend
    templateCache = $templateCache
    timeout = $timeout
  }))

  it('should compile charts when #renderChart', inject(function($compile) {
    httpBackend.whenGET('components/charts/views/_sliderCharts.html')
      .respond(templateCache.get('/components/charts/views/_sliderCharts.html'))

    element = angular.element('<slider-charts></slider-charts>')
    element = $compile(element)(scope)

    httpBackend.flush()

    var elementScope = element.isolateScope()
    expect(elementScope.slides.length).toBeGreaterThan(1)
    expect(elementScope.currentSlideType).toBe('scatter-plot-chart')

    elementScope.slides[0].active = true
    elementScope.$digest()
    expect(elementScope.currentSlideType.length).toBeGreaterThan(0)

    expect(elementScope.width).not.toBeDefined()
    timeout.flush()
    expect(elementScope.width).toBeDefined()
  }))
})
