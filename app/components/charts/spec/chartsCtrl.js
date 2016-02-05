'use strict'

describe('Controller: chartsCtrl', function() {

  // load the controller's module
  beforeEach(module('siurana.charts'))

  var chartsCtrl, scope, rootScope, RoutesSvc,
  deferred

  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new()
    rootScope = $rootScope

    // RoutesSvc Stub
    RoutesSvc = {
      subscribeForUpdates:  function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(RoutesSvc, 'subscribeForUpdates')

    chartsCtrl = $controller('chartsCtrl as chartsVm', {
      $scope:          scope,
      RoutesSvc:       RoutesSvc,
      ResolvedRoutes:  {}
    })
  }))

  it('should listen on event routes change', function() {
    rootScope.$digest()

    expect(RoutesSvc.subscribeForUpdates).toHaveBeenCalled()
  })

  it('should #initController with new empty route', function() {
    scope.chartsVm.initController({test:'data'})

    expect(scope.chartsVm.routes).toEqual(jasmine.any(Array))
    expect(scope.chartsVm.routes.length).toBe(1)
  })
})
