'use strict'

describe('Service: RoutesSyncSvc', function() {
  beforeEach(module('siurana.routes', function($provide) {
    RoutesPersistSvc = {
      getRoutes:              function() {},
      updateRoute:            function() {},
      deleteRoute:            function() {},
      addRoute:               function() {},
      cleanObjectProperties:  function() {}
    }
    RoutesCache = {
      getData:     function() {},
      setData:     function() {},
      removeData:  function() {}
    }
    $provide.value('RoutesCache', RoutesCache)
    $provide.value('RoutesPersistSvc', RoutesPersistSvc)
  }))

  var mockRoute, scope, deferred, myService, RoutesPersistSvc, localStorage,
  RoutesCache, log
  beforeEach(inject(function(_RoutesSyncSvc_, _RoutesPersistSvc_, $q,
  $rootScope, $localStorage, _RoutesCache_, $log) {
    myService = _RoutesSyncSvc_
    mockRoute= { id: 1, name: 'test' }
    RoutesPersistSvc = _RoutesPersistSvc_
    RoutesCache = _RoutesCache_
    localStorage = $localStorage
    log = $log

    scope = $rootScope.$new()
    deferred = $q.defer()

    spyOn(RoutesPersistSvc, 'deleteRoute').and.returnValue(deferred.promise)
    spyOn(RoutesPersistSvc, 'getRoutes').and.returnValue(deferred.promise)
    spyOn(RoutesPersistSvc, 'updateRoute').and.returnValue(deferred.promise)
    spyOn(RoutesPersistSvc, 'addRoute').and.returnValue(deferred.promise)
    spyOn(RoutesPersistSvc, 'cleanObjectProperties').and.returnValue(mockRoute)
  }))

  describe('#getRoutes method', function() {
    it('should use cache if exists', function() {
      spyOn(RoutesCache, 'getData').and.returnValue('exists')
      myService.getRoutes()
      scope.$digest()
      expect(RoutesPersistSvc.getRoutes).not.toHaveBeenCalled()
      expect(RoutesCache.getData).toHaveBeenCalled()
    })
    it('should persist to session localStorage', function() {
      spyOn(RoutesCache, 'setData')
      myService.getRoutes()
      deferred.resolve({data: 'test'})
      scope.$digest()

      expect(RoutesPersistSvc.getRoutes).toHaveBeenCalled()
      expect(localStorage.routes).toBe('test')
      expect(RoutesCache.setData).toHaveBeenCalledWith('test')
    })
    it('should use localStorage if network query failed', function() {
      spyOn(RoutesCache, 'setData')
      localStorage.routes = 'test'
      myService.getRoutes()
      deferred.reject(false)
      scope.$digest()

      expect(RoutesPersistSvc.getRoutes).toHaveBeenCalled()
      expect(RoutesCache.setData).toHaveBeenCalledWith('test')
    })
    it('should log message if forceRefresh fail', function() {
      spyOn(log, 'log')
      myService.getRoutes(true)
      deferred.reject(false)
      scope.$digest()

      expect(log.log).toHaveBeenCalled()
    })
    it('should create timeout to sync if network query failed', function() {
      spyOn(myService, 'createTimeout')
      localStorage.routes = [{ '$sync': true }]
      myService.getRoutes()
      deferred.reject(false)
      scope.$digest()

      expect(myService.createTimeout).toHaveBeenCalled()
    })
  })

  describe('#createRoute method', function() {
    it('should persist to session and localStorage with id', function() {
      var spyDeferred = {
        resolve: jasmine.createSpy('resolve'),
        reject: jasmine.createSpy('reject')
      }
      spyOn(RoutesCache, 'setData')
      myService.createRoute(mockRoute, spyDeferred)
      deferred.resolve({data: mockRoute})
      scope.$digest()

      expect(RoutesPersistSvc.addRoute).toHaveBeenCalled()
      expect(RoutesPersistSvc.updateRoute).toHaveBeenCalled()
      expect(spyDeferred.resolve).toHaveBeenCalledWith(mockRoute)
      expect(RoutesCache.setData).toHaveBeenCalledWith(mockRoute, mockRoute.id)
    })

    it('should sync route if network query failed', function() {
      spyOn(myService, 'createRouteSync')
      var spyDeferred = {
        resolve: jasmine.createSpy('resolve'),
        reject: jasmine.createSpy('reject')
      }

      myService.createRoute(mockRoute, spyDeferred)
      deferred.reject(false)
      scope.$digest()

      expect(myService.createRouteSync).toHaveBeenCalled()
      expect(spyDeferred.reject).toHaveBeenCalled()
    })
  })

  describe('#updateRoute method', function() {
    it('should persist to session and localStorage with id', function() {
      var spyDeferred = {
        resolve: jasmine.createSpy('resolve'),
        reject: jasmine.createSpy('reject')
      }
      spyOn(RoutesCache, 'setData')
      myService.updateRoute(mockRoute, spyDeferred)
      deferred.resolve()
      scope.$digest()

      expect(RoutesPersistSvc.updateRoute).toHaveBeenCalled()
      expect(spyDeferred.resolve).toHaveBeenCalled()
      expect(RoutesCache.setData).toHaveBeenCalledWith(mockRoute, mockRoute.id)
    })

    it('should sync route if network query failed', function() {
      spyOn(myService, 'createRouteSync')
      var spyDeferred = {
        resolve: jasmine.createSpy('resolve'),
        reject: jasmine.createSpy('reject')
      }
      myService.updateRoute(mockRoute, spyDeferred)
      deferred.reject()
      scope.$digest()

      expect(RoutesPersistSvc.updateRoute).toHaveBeenCalled()
      expect(spyDeferred.reject).toHaveBeenCalled()
      expect(myService.createRouteSync).toHaveBeenCalled()
    })
  })

  describe('#deleteRoute method', function() {
    it('should persist to session and localStorage with id', function() {
      spyOn(RoutesCache, 'removeData')
      myService.deleteRoute(mockRoute)
      deferred.resolve()
      scope.$digest()

      expect(RoutesPersistSvc.deleteRoute).toHaveBeenCalled()
      expect(RoutesCache.removeData).toHaveBeenCalledWith(mockRoute.id)
    })

    it('should sync route if network query failed', function() {
      spyOn(myService, 'createRouteSync')
      myService.deleteRoute(mockRoute)
      deferred.reject()
      scope.$digest()

      expect(RoutesPersistSvc.deleteRoute).toHaveBeenCalled()
      expect(myService.createRouteSync).toHaveBeenCalled()
    })
  })
})
