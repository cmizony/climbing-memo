'use strict'

describe('Routes: Table', function() {

  beforeEach(module('climbingMemo.table'))

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
})
