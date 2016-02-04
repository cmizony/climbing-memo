'use strict'

describe('Directive: routeSummary', function() {

  // load the directive's module
  beforeEach(module('templates'))
  beforeEach(angular.mock.module('climbingMemo.routes', function($provide) {
    $provide.service('RoutesSvc', function() {
      return {
        getRoutes: function() {}
      }
    })
    $provide.service('utilsChartSvc', function() {
      return {
        arrayGroupBy: function() {}
      }
    })
  }))

  var element, scope, httpBackend, templateCache, RoutesUtilsSvc,
  utilsChartSvc, RoutesSvc
  beforeEach(inject(function($rootScope, $httpBackend, $templateCache,
  $compile, _RoutesUtilsSvc_, _utilsChartSvc_, _RoutesSvc_, $q) {
    scope          = $rootScope.$new()
    httpBackend    = $httpBackend
    templateCache  = $templateCache
    RoutesUtilsSvc = _RoutesUtilsSvc_
    utilsChartSvc  = _utilsChartSvc_
    RoutesSvc = _RoutesSvc_

    httpBackend.whenGET('components/routes/views/_routeSummary.html')
      .respond(templateCache.get('/components/routes/views/_routeSummary.html'))

    spyOn(RoutesUtilsSvc, 'getIconStatus')
    spyOn(RoutesUtilsSvc, 'getIconRock')
    spyOn(RoutesUtilsSvc, 'getIndoorLabel')
    spyOn(RoutesUtilsSvc, 'getTypeColor')

    spyOn(utilsChartSvc, 'arrayGroupBy').and.returnValue(['test'])

    var deferred = $q.defer()
    deferred.resolve({})
    spyOn(RoutesSvc, 'getRoutes').and.returnValue(deferred.promise)

    element = $compile('<route-summary></route-summary>')(scope)

    httpBackend.flush()
    scope.$digest()
    scope = element.isolateScope()
  }))

  it('should map function to RoutesUtilsSvc', function() {
    expect(RoutesUtilsSvc.getIconStatus).toHaveBeenCalled()
    expect(RoutesUtilsSvc.getIconRock).toHaveBeenCalled()
    expect(RoutesUtilsSvc.getIndoorLabel).toHaveBeenCalled()
    expect(RoutesUtilsSvc.getTypeColor).toHaveBeenCalled()
  })

  it('should #getTimes', function() {
    expect(scope.getTimes(5).length).toBe(5)
  })

  it('should #sectorPopulatePlaceholder', function() {
    var sectorA = { sector: 'sectorA' }
    var sectorB = { sector: 'sectorB' }
    scope.route = sectorA
    scope.arrayRoutes = [sectorA, sectorB]

    scope.sectorPopulatePlaceholder()

    expect(utilsChartSvc.arrayGroupBy.calls.mostRecent().args).toEqual(
      [[sectorA], 'location']
    )
    expect(scope.route.type).toMatch('test')
    expect(scope.route.rock).toMatch('test')
    expect(scope.route.location).toMatch('test')
  })
})
