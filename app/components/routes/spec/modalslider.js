'use strict'

describe('Controller: ModalsliderCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo.routes'))

  var ModalsliderCtrl, scope, modalInstance, utilsChartSvc, routesId, filters,
  RoutesSvc, deferred, RoutesUtilsSvc

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $log, $localStorage,
  $q) {
    scope = $rootScope.$new()

    // modalInstance Stub
    modalInstance = {
      dismiss: function() {}
    }
    spyOn(modalInstance, 'dismiss')

    // utilsChartSvc stub
    utilsChartSvc = {
      typeColor:     function() {}
    }
    spyOn(utilsChartSvc, 'typeColor').and.returnValue('green')


    // RoutesSvc Stub
    RoutesSvc = {
      getRoutes:       function() {},
      saveRoute:       function() {},
      deleteRoute:     function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(RoutesSvc, 'getRoutes').and.returnValue(deferred.promise)
    spyOn(RoutesSvc, 'saveRoute').and.returnValue(deferred.promise)
    spyOn(RoutesSvc, 'deleteRoute').and.returnValue(deferred.promise)

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
    // routesId stub
    routesId = [2, 3]

    // filters stub
    filters = {
      routeNoteFormattingFilter: function() {}
    }
    spyOn(filters, 'routeNoteFormattingFilter')

    ModalsliderCtrl = $controller('ModalsliderCtrl', {
      $scope:                     scope,
      $uibModalInstance:          modalInstance,
      routesId:                   routesId,
      routeNoteFormattingFilter:  filters.routeNoteFormattingFilter,
      utilsChartSvc:              utilsChartSvc,
      RoutesSvc:                  RoutesSvc,
      RoutesUtilsSvc:             RoutesUtilsSvc
    })
  }))

  it('should $editRoute', function() {
    var route = {}
    scope.editRoute(route)

    expect(route.$editMode).toBe(true)
  })

  it('should $copyRoute', function() {
    var route = {id: 1}
    scope.copyRoute(route)

    expect(route.id).toBe(false)
    expect(route.$copy).toBeDefined()
    expect(route.$editMode).toBe(true)
  })

  it("should #saveRoute", function() {
    modalInstance.dismiss.calls.reset()
    RoutesSvc.saveRoute.calls.reset()
    var route = {}
    scope.saveRoute(route)

    expect(RoutesSvc.saveRoute).toHaveBeenCalled()
    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
    expect(route.$editMode).toBe(false)
  })

  it("should #deleteRoute", function() {
    RoutesSvc.deleteRoute.calls.reset()
    modalInstance.dismiss.calls.reset()
    var route = {}
    scope.deleteRoute(route)

    expect(RoutesSvc.deleteRoute).toHaveBeenCalled()
    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
    expect(route.$editMode).toBe(false)
  })

  it("should #cancelEdit", function() {
    modalInstance.dismiss.calls.reset()
    var route = {}
    scope.cancelEdit(route)

    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
    expect(route.$editMode).toBe(false)
  })

  it("should #closeModal", function() {
    modalInstance.dismiss.calls.reset()
    scope.closeModal()

    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it("should #initController", function() {
    filters.routeNoteFormattingFilter.calls.reset()
    var routes = [{id: 1}, {id: 2}, {id: 3}, {id: 4}]

    scope.initController(routes)

    expect(scope.slides.length).toBe(2)
    expect(filters.routeNoteFormattingFilter).toHaveBeenCalled()
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


  it("should #getTimes", function() {
    expect(scope.getTimes(5).length).toBe(5)
  })

  it("should #flipCard", function() {
    var slides = [{}, {active: true}, {}]
    scope.slides = slides

    scope.flipCard()
    expect(slides[1].$hover).toBe(true)
    scope.flipCard()
    expect(slides[1].$hover).toBe(false)
  })
})
