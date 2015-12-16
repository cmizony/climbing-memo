'use strict'

describe('Controller: chartsCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var chartsCtrl, scope, rootScope, utilsRouteSvc,
  deferred

  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new()
    rootScope = $rootScope

    // utilsRouteSvc Stub
    utilsRouteSvc = {
      getRoutes:       function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(utilsRouteSvc, 'getRoutes').and.returnValue(deferred.promise)

    chartsCtrl = $controller('chartsCtrl as chartsVm', {
      $scope:          scope,
      utilsRouteSvc:   utilsRouteSvc
    })
  }))

  it('should watch for #routesUpdated event', function() {
    utilsRouteSvc.getRoutes.calls.reset()

    rootScope.$emit('routesUpdated')
    rootScope.$digest()

    expect(utilsRouteSvc.getRoutes).toHaveBeenCalled()
  })

  it('should #initController with new empty route', function() {
    scope.chartsVm.initController({test:'data'})

    expect(scope.chartsVm.routes).toEqual(jasmine.any(Array))
    expect(scope.chartsVm.routes.length).toBe(1)
  })
})
