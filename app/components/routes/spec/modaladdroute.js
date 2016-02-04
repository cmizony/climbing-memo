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
      saveRoute:            function() {}
    }
    deferred = $q.defer()
    deferred.resolve({})
    spyOn(RoutesSvc, 'saveRoute').and.returnValue(deferred.promise)

    // utilsChartSvc stub
    utilsChartSvc = { arrayGroupBy: function() {} }
    spyOn(utilsChartSvc, 'arrayGroupBy').and.returnValue(['test'])

    ModaladdrouteCtrl = $controller('ModaladdrouteCtrl', {
      $scope:             scope,
      $uibModalInstance:  modalInstance,
      RoutesSvc:          RoutesSvc,
      utilsChartSvc:      utilsChartSvc
    })
  }))

  it('should close the modal on #cancelEdit', function() {
    modalInstance.dismiss.calls.reset()
    scope.initController()
    scope.cancelEdit()

    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel')
  })

  it('should #flipCard', function() {
    scope.route = { $hover: false }
    scope.flipCard()

    expect(scope.route.$hover).toBe(true)
  })

  it('should #saveRoute and close the modal', function() {
    RoutesSvc.saveRoute.calls.reset()
    scope.initController()
    scope.saveRoute()

    expect(RoutesSvc.saveRoute).toHaveBeenCalled()
  })

  it('should #initController with new empty route', function() {
    scope.initController()
    expect(scope.route).toBeDefined()
    expect(scope.route.notes).toBeDefined()
    expect(scope.route.status).toBeDefined()
  })
})
