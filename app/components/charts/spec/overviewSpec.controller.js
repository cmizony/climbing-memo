'use strict'

describe('Controller: overviewCtrl', function() {

  // load the controller's module
  beforeEach(module('siurana.charts'))

  var overviewCtrl, scope, rootScope, RoutesSvc,
  deferred, utilsChartSvc

  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new()
    rootScope = $rootScope

    // RoutesSvc Stub
    RoutesSvc = {
      getRoutes:            function() {},
      subscribeForUpdates:  function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(RoutesSvc, 'getRoutes').and.returnValue(deferred.promise)
    spyOn(RoutesSvc, 'subscribeForUpdates')

    // utilsChartSvc stub
    utilsChartSvc = { arrayGroupBy: function() {} }
    spyOn(utilsChartSvc, 'arrayGroupBy').and.returnValue(['test1', 'test2'])

    overviewCtrl = $controller('overviewCtrl', {
      $scope:         scope,
      RoutesSvc:      RoutesSvc,
      utilsChartSvc:  utilsChartSvc
    })
  }))

  it('should listen on event routes change', function() {
    rootScope.$digest()

    expect(RoutesSvc.getRoutes).toHaveBeenCalled()
    expect(RoutesSvc.subscribeForUpdates).toHaveBeenCalled()
  })

  it('should #initController with new empty route', function() {
    scope.initController({test:'data'})

    expect(scope.routes).toEqual(jasmine.any(Array))
    expect(scope.routes.length).toBe(1)

    expect(scope.metrics).toEqual({
      count:           1,
      favoriteSector:  'test1',
      favoriteType:    'test1'
    })
  })
})
