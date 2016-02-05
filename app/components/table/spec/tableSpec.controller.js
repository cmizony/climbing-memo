'use strict'

describe('Controller: tableCtrl', function() {

  // load the controller's module
  beforeEach(module('siurana.table'))

  var tableCtrl, scope, modal, rootScope, RoutesSvc,
  deferred, utilsChartSvc, RoutesUtilsSvc

  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new()
    rootScope = $rootScope

    // modal Stub
    modal = {
      open: function() {}
    }
    spyOn(modal, 'open')

    // RoutesSvc Stub
    RoutesSvc = {
      getRoutes:            function() {},
      subscribeForUpdates:  function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(RoutesSvc, 'getRoutes').and.returnValue(deferred.promise)
    spyOn(RoutesSvc, 'subscribeForUpdates')


    // RoutesUtilsSvc Stub
    RoutesUtilsSvc = {
      getTypeColor:    function() {}
    }
    spyOn(RoutesUtilsSvc, 'getTypeColor')

    // utilsChartSvc stub
    utilsChartSvc = { arrayGroupBy: function() {} }
    spyOn(utilsChartSvc, 'arrayGroupBy').and.returnValue(['test'])

    tableCtrl = $controller('tableCtrl as tableVm', {
      $scope:          scope,
      $uibModal:       modal,
      RoutesSvc:       RoutesSvc,
      RoutesUtilsSvc:  RoutesUtilsSvc,
      utilsChartSvc:   utilsChartSvc,
      ResolvedRoutes:  {}
    })
  }))

  it('should listen on event routes change', function() {
    rootScope.$digest()

    expect(RoutesSvc.subscribeForUpdates).toHaveBeenCalled()
  })

  it('should #initController', function() {
    utilsChartSvc.arrayGroupBy.calls.reset()
    var data = {
      key1: {},
      key2: {}
    }
    scope.tableVm.initController(data)

    expect(scope.tableVm.routes.length).toBe(2)
    expect(scope.tableVm.routes).toEqual(jasmine.any(Array))
    expect(utilsChartSvc.arrayGroupBy).toHaveBeenCalled()
    expect(scope.tableVm.locations).toEqual(['test'])
    expect(scope.tableVm.sectors).toEqual(['test'])
  })

  it('should #getTypeColor', function() {
    var route = {type: 'test'}
    scope.tableVm.getTypeColor(route)

    expect(RoutesUtilsSvc.getTypeColor).toHaveBeenCalledWith(route)
  })

  it('should #addRoute', function() {
    modal.open.calls.reset()

    scope.tableVm.addRoute()
    expect(modal.open).toHaveBeenCalled()
  })

  it('should #openRouteModal', function() {
    modal.open.calls.reset()

    scope.tableVm.openRouteModal()
    expect(modal.open).toHaveBeenCalled()
  })

})
