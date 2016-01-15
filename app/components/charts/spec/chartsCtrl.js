'use strict'

describe('Controller: chartsCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo.charts'))

  var chartsCtrl, scope, rootScope, RoutesSvc,
  deferred

  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new()
    rootScope = $rootScope

    // RoutesSvc Stub
    RoutesSvc = {
      getRoutes:       function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(RoutesSvc, 'getRoutes').and.returnValue(deferred.promise)

    chartsCtrl = $controller('chartsCtrl as chartsVm', {
      $scope:          scope,
      RoutesSvc:   RoutesSvc
    })
  }))

  it('should watch for #routesUpdated event', function() {
    RoutesSvc.getRoutes.calls.reset()

    rootScope.$emit('routesUpdated')
    rootScope.$digest()

    expect(RoutesSvc.getRoutes).toHaveBeenCalled()
  })

  it('should #initController with new empty route', function() {
    scope.chartsVm.initController({test:'data'})

    expect(scope.chartsVm.routes).toEqual(jasmine.any(Array))
    expect(scope.chartsVm.routes.length).toBe(1)
  })
})
