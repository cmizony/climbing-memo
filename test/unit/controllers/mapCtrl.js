'use strict'

describe('Controller: mapCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  var mapCtrl, scope, rootScope, RoutesSvc,
  deferred, mapChartSvc

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

    // mapChartSvc stub
    mapChartSvc = { processData: function() {} }
    spyOn(mapChartSvc, 'processData').and.returnValue([
      {metrics: [{type: 'Boulder'}]},
      {metrics: [{type: 'Sport Lead'}]}
    ])

    mapCtrl = $controller('mapCtrl as mapVm', {
      $scope:          scope,
      RoutesSvc:       RoutesSvc,
      mapChartSvc:     mapChartSvc,
      ResolvedRoutes:  {}
    })
  }))

  it('should listen on event routes change', function() {
    rootScope.$digest()

    expect(RoutesSvc.subscribeForUpdates).toHaveBeenCalled()
  })

  it('should #initController with new empty route', function() {
    scope.mapVm.initController({test:'data'})

    expect(_.isEqual(scope.mapVm.locations, [
      {"metrics":[{"type":"Boulder"}],"options":{"icon":"images/climbing_blue.png"}},
      {"metrics":[{"type":"Sport Lead"}],"options":{"icon":"images/climbing_gray.png"}}
    ])).toBe(true)
  })

  it('should #getMarkerIcon', function() {
    var types = ['Sport lead', 'Boulder', 'Traditional', 'Multi-pitch', 'Top rope']

    expect(scope.mapVm.getMarkerIcon(types[0])).toMatch(/yellow/)
    expect(scope.mapVm.getMarkerIcon(types[1])).toMatch(/blue/)
    expect(scope.mapVm.getMarkerIcon(types[2])).toMatch(/green/)
    expect(scope.mapVm.getMarkerIcon(types[3])).toMatch(/orange/)
    expect(scope.mapVm.getMarkerIcon(types[4])).toMatch(/gray/)
    expect(scope.mapVm.getMarkerIcon('undefined')).toMatch(/gray/)
  })
})
