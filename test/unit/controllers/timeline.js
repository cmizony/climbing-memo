'use strict'

describe('Controller: TimelineCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  /**
  * Initialize local variables for unit-test
  */
  var TimelineCtrl, scope, deferred, utilsChartSvc,
  rootScope, modal, timelineSvc, RoutesSvc, RoutesUtilsSvc

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $log, $rootScope, $q) {
    scope = $rootScope.$new()
    rootScope = $rootScope

    // utilsChartSvc stub
    utilsChartSvc = {
      arrayGroupBy:  function() {},
      typeColor:     function() {}
    }
    spyOn(utilsChartSvc, 'typeColor').and.returnValue('green')

    // RoutesSvc Stub
    RoutesSvc = {
      getRoutes:       function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(RoutesSvc, 'getRoutes').and.returnValue(deferred.promise)

    // RoutesUtilsSvc Stub
    RoutesUtilsSvc = {
      getTypeColor:    function() {}
    }
    spyOn(RoutesUtilsSvc, 'getTypeColor')

    // modal stub
    modal = { open:     function() {} }
    spyOn(modal, 'open')

    // timelineSvc stub
    timelineSvc = {
      processData: function() {}
    }
    spyOn(timelineSvc, 'processData').and.returnValue([1,2,3])

    TimelineCtrl = $controller('TimelineCtrl as timelineVm', {
      $scope:          scope,
      timelineSvc:     timelineSvc,
      $rootScope:      rootScope,
      utilsChartSvc:   utilsChartSvc,
      RoutesSvc:       RoutesSvc,
      RoutesUtilsSvc:  RoutesUtilsSvc,
      $uibModal:       modal
    })
  }))

  it('should listen on event #routesUpdated', function() {
    RoutesSvc.getRoutes.calls.reset()
    rootScope.$emit('routesUpdated')
    rootScope.$digest()

    expect(RoutesSvc.getRoutes).toHaveBeenCalled()
  })

  it('should #getTypeColor', function() {
    RoutesUtilsSvc.getTypeColor.calls.reset()
    scope.timelineVm.getTypeColor({mainType: 'test'})

    expect(RoutesUtilsSvc.getTypeColor).toHaveBeenCalled()
  })

  it('should open modal on #addRoute', function() {
    modal.open.calls.reset()

    scope.timelineVm.addRoute()
    expect(modal.open).toHaveBeenCalled()
  })

  it('should #getBadgeTooltip', function() {
    var event = {
      isIndoor: true,
      mainType: 'test'
    }
    expect(scope.timelineVm.getBadgeTooltip(event)).toBe('Indoor test')
  })

  it('should #getBadgeIcon', function() {
    var event = { isIndoor: true }
    expect(scope.timelineVm.getBadgeIcon(event)).toBe('fa fa-home')

    event = { isIndoor: false }
    expect(scope.timelineVm.getBadgeIcon(event)).toBe('fa fa-sun-o')
  })

  it('should #openRouteModal', function() {
    modal.open.calls.reset()
    scope.timelineVm.openRouteModal()

    expect(modal.open).toHaveBeenCalled()
  })

  it('should #initController ', function() {
    timelineSvc.processData.calls.reset()
    scope.timelineVm.initController({})

    expect(_.size(scope.timelineVm.events)).toBe(3)
    expect(timelineSvc.processData).toHaveBeenCalled()
  })
})
