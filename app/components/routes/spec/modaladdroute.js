'use strict'

describe('Controller: ModaladdrouteCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo.routes'))

  var ModaladdrouteCtrl, scope, modalInstance, rootScope, RoutesSvc,
  deferred, utilsChartSvc, RoutesUtilsSvc

  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new()
    rootScope = $rootScope

    // modalInstance Stub
    modalInstance = {
      dismiss: function() {}
    }
    spyOn(modalInstance, 'dismiss')

    // RoutesSvc Stub
    RoutesSvc = {
      getRoutes:       function() {},
      saveRoute:       function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(RoutesSvc, 'getRoutes').and.returnValue(deferred.promise)
    spyOn(RoutesSvc, 'saveRoute').and.returnValue(deferred.promise)

    // RoutesUtilsSvc Stub
    RoutesUtilsSvc = {
      getIconStatus:   function() {},
      getIconRock:     function() {},
      getIndoorLabel:  function() {},
      getTypeColor:    function() {}
    }
    spyOn(RoutesUtilsSvc, 'getIconStatus')
    spyOn(RoutesUtilsSvc, 'getIconRock')
    spyOn(RoutesUtilsSvc, 'getIndoorLabel')
    spyOn(RoutesUtilsSvc, 'getTypeColor')

    // utilsChartSvc stub
    utilsChartSvc = { arrayGroupBy: function() {} }
    spyOn(utilsChartSvc, 'arrayGroupBy').and.returnValue(['test'])

    ModaladdrouteCtrl = $controller('ModaladdrouteCtrl', {
      $scope:             scope,
      $uibModalInstance:  modalInstance,
      RoutesSvc:          RoutesSvc,
      RoutesUtilsSvc:     RoutesUtilsSvc,
      utilsChartSvc:      utilsChartSvc
    })
  }))

  it('should watch for #routesUpdated event', function() {
    RoutesSvc.getRoutes.calls.reset()

    rootScope.$emit('routesUpdated')
    rootScope.$digest()

    expect(RoutesSvc.getRoutes).toHaveBeenCalled()
  })

  it('should close the modal on #cancelEdit', function() {
    modalInstance.dismiss.calls.reset()
    scope.cancelEdit()

    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it('should #flipCard', function() {
    scope.route = { $hover: false }
    scope.flipCard()

    expect(scope.route.$hover).toBe(true)
  })

  it('should #sectorPopulatePlaceholder', function() {
    modalInstance.dismiss.calls.reset()

    var sectorA = { sector: 'sectorA' }
    var sectorB = { sector: 'sectorB' }
    scope.route = sectorA
    scope.arrayRoutes = [sectorA, sectorB]

    scope.sectorPopulatePlaceholder()

    expect(utilsChartSvc.arrayGroupBy.calls.mostRecent().args).toEqual(
      [[sectorA], 'location']
    )
    expect(scope.route.type).toMatch('test')
    expect(scope.route.rock).toMatch('test')
    expect(scope.route.location).toMatch('test')
  })

  it('should #saveRoute and close the modal', function() {
    RoutesSvc.saveRoute.calls.reset()
    scope.saveRoute()

    expect(RoutesSvc.saveRoute).toHaveBeenCalled()
  })

  it('should #initController with new empty route', function() {
    scope.initController({test:'data'})

    expect(scope.route).toBeDefined()
    expect(scope.locations.length).toBe(1)
    expect(scope.sectors.length).toBe(1)
    expect(scope.arrayRoutes.length).toBe(1)
  })

  it('should #getIconRock', function() {
    RoutesUtilsSvc.getIconRock.calls.reset()
    scope.getIconRock()

    expect(RoutesUtilsSvc.getIconRock).toHaveBeenCalled()
  })

  it('should #getIconStatus', function() {
    RoutesUtilsSvc.getIconStatus.calls.reset()
    scope.getIconStatus()

    expect(RoutesUtilsSvc.getIconStatus).toHaveBeenCalled()
  })

  it('should #getIndoorLabel', function() {
    RoutesUtilsSvc.getIndoorLabel.calls.reset()
    scope.getIndoorLabel()

    expect(RoutesUtilsSvc.getIndoorLabel).toHaveBeenCalled()
  })

  it('should #getTypeColor', function() {
    RoutesUtilsSvc.getTypeColor.calls.reset()
    scope.getTypeColor()

    expect(RoutesUtilsSvc.getTypeColor).toHaveBeenCalled()
  })

})
