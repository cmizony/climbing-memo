'use strict'

describe('Routes: Timeline', function() {

  beforeEach(module('climbingMemo.timeline'))

  var route, RoutesSvc, injector
  beforeEach(inject(function($route, _RoutesSvc_, $injector) {
    route = $route
    RoutesSvc = _RoutesSvc_
    injector = $injector

    spyOn(RoutesSvc, 'getRoutes')
  }))

  describe('#/timeline', function() {
    it('should resolve ResolvedRoutes promise', function() {
      var timelineRoute = route.routes['/timeline']
      var ResolvedRoutesBlock = timelineRoute.resolve.ResolvedRoutes
      injector.invoke(ResolvedRoutesBlock)

      expect(RoutesSvc.getRoutes).toHaveBeenCalled()
    })
  })
})
