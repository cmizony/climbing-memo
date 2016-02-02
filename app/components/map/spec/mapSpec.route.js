'use strict'

describe('Routes: Map', function() {

  beforeEach(module('climbingMemo.map'))

  var route, RoutesSvc, injector
  beforeEach(inject(function($route, _RoutesSvc_, $injector) {
    route = $route
    RoutesSvc = _RoutesSvc_
    injector = $injector

    spyOn(RoutesSvc, 'getRoutes')
  }))

  describe('#/map', function() {
    it('should resolve ResolvedRoutes promise', function() {
      var mapRoute = route.routes['/map']
      var ResolvedRoutesBlock = mapRoute.resolve.ResolvedRoutes
      injector.invoke(ResolvedRoutesBlock)

      expect(RoutesSvc.getRoutes).toHaveBeenCalled()
    })
  })
})
