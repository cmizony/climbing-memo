'use strict'

describe('Service: RoutesSvc', function() {

  // load the service's module
  beforeEach(module('siurana.routes'))

  // instantiate service
  var mockRoute, notificationService, scope, deferred, RoutesSyncSvc, myService
  beforeEach(inject(function(_RoutesSvc_, _RoutesSyncSvc_, $q,
  _notificationService_, $rootScope) {
    myService = _RoutesSvc_
    mockRoute= { id: 1, name: 'test' }
    notificationService = _notificationService_
    RoutesSyncSvc = _RoutesSyncSvc_

    scope = $rootScope.$new()
    deferred = $q.defer()

    spyOn(RoutesSyncSvc, 'deleteRoute').and.returnValue(deferred.promise)
    spyOn(RoutesSyncSvc, 'saveRoute').and.returnValue(deferred.promise)
    spyOn(RoutesSyncSvc, 'getRoutes').and.returnValue(deferred.promise)
    spyOn(notificationService, 'success')
    spyOn(notificationService, 'info')
  }))

  describe('#getRoutes method', function() {
    it('should call RoutesSync service', function() {
      myService.getRoutes()
      expect(RoutesSyncSvc.getRoutes).toHaveBeenCalled()
    })
  })

  describe('#saveRoute method', function() {
    it('should resolve based on RoutesSync service', function() {
      myService.saveRoute(mockRoute)
      expect(RoutesSyncSvc.saveRoute).toHaveBeenCalledWith(mockRoute)

      deferred.resolve(mockRoute)
      scope.$digest()

      expect(notificationService.success).toHaveBeenCalled()
    })
    it('should reject based on RoutesSync service', function() {
      myService.saveRoute(mockRoute)
      expect(RoutesSyncSvc.saveRoute).toHaveBeenCalledWith(mockRoute)

      deferred.reject(false)
      scope.$digest()

      expect(notificationService.info).toHaveBeenCalled()
    })
  })

  describe('#deleteRoute method', function() {
    it('should resolve based on RoutesSync service', function() {
      myService.deleteRoute(mockRoute)
      expect(RoutesSyncSvc.deleteRoute).toHaveBeenCalledWith(mockRoute)

      deferred.resolve(mockRoute)
      scope.$digest()

      expect(notificationService.success).toHaveBeenCalled()
    })
    it('should reject based on RoutesSync service', function() {
      myService.deleteRoute(mockRoute)
      expect(RoutesSyncSvc.deleteRoute).toHaveBeenCalledWith(mockRoute)

      deferred.reject(false)
      scope.$digest()

      expect(notificationService.info).toHaveBeenCalled()
    })
  })

})
