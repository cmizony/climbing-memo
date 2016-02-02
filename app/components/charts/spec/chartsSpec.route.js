'use strict'

describe('Routes: Charts', function() {
  beforeEach(module('climbingMemo.charts'))

  var route, RoutesSvc, injector
  beforeEach(inject(function($route, _RoutesSvc_, $injector) {
    route = $route
    RoutesSvc = _RoutesSvc_
    injector = $injector

    spyOn(RoutesSvc, 'getRoutes')
  }))

  describe('#/charts', function() {
    it('should resolve ResolvedRoutes promise', function() {
      var chartsRoute = route.routes['/charts']
      var ResolvedRoutesBlock = chartsRoute.resolve.ResolvedRoutes
      injector.invoke(ResolvedRoutesBlock)

      expect(RoutesSvc.getRoutes).toHaveBeenCalled()
    })
  })
})
