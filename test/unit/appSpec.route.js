'use strict'

describe('Routes: siurana', function() {

  beforeEach(module('siurana'))

  var route, RoutesSvc, injector
  beforeEach(inject(function($route, _RoutesSvc_, $injector) {
    route = $route
    RoutesSvc = _RoutesSvc_
    injector = $injector

    spyOn(RoutesSvc, 'getRoutes')
  }))

  describe('#/table', function() {
    it('should resolve ResolvedRoutes promise', function() {
      var tableRoute = route.routes['/table']
      var ResolvedRoutesBlock = tableRoute.resolve.ResolvedRoutes
      injector.invoke(ResolvedRoutesBlock)

      expect(RoutesSvc.getRoutes).toHaveBeenCalled()
    })
  })

  describe('#/charts', function() {
    it('should resolve ResolvedRoutes promise', function() {
      var chartsRoute = route.routes['/charts']
      var ResolvedRoutesBlock = chartsRoute.resolve.ResolvedRoutes
      injector.invoke(ResolvedRoutesBlock)

      expect(RoutesSvc.getRoutes).toHaveBeenCalled()
    })
  })

  describe('#/timeline', function() {
    it('should resolve ResolvedRoutes promise', function() {
      var timelineRoute = route.routes['/timeline']
      var ResolvedRoutesBlock = timelineRoute.resolve.ResolvedRoutes
      injector.invoke(ResolvedRoutesBlock)

      expect(RoutesSvc.getRoutes).toHaveBeenCalled()
    })
  })

  describe('#/map', function() {
    it('should resolve ResolvedRoutes promise', function() {
      var mapRoute = route.routes['/map']
      var ResolvedRoutesBlock = mapRoute.resolve.ResolvedRoutes
      injector.invoke(ResolvedRoutesBlock)

      expect(RoutesSvc.getRoutes).toHaveBeenCalled()
    })
  })
})
