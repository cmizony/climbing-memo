'use strict'

describe('Service: RoutesSyncSvc', function() {

  beforeEach(module('climbingMemo.routes', function($provide) {
    RoutesPersistSvc = {
      getRoutes:              function() {},
      updateRoute:            function() {},
      deleteRoute:            function() {},
      addRoute:               function() {},
      cleanObjectProperties:  function() {}
    }
    $provide.value('RoutesPersistSvc', RoutesPersistSvc)
  }))

  var mockRoute, scope, deferred, myService, RoutesPersistSvc, localStorage
  beforeEach(inject(function(_RoutesSyncSvc_, _RoutesPersistSvc_, $q,
  $rootScope, $localStorage) {
    myService = _RoutesSyncSvc_
    mockRoute= { id: 1, name: 'test' }
    RoutesPersistSvc = _RoutesPersistSvc_
    localStorage = $localStorage

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
      myService.cache = 'test'
      myService.getRoutes()
      scope.$digest()
      expect(RoutesPersistSvc.getRoutes).not.toHaveBeenCalled()
    })
    it('should persist to session localStorage', function() {
      myService.getRoutes()
      deferred.resolve({data: 'test'})
      scope.$digest()

      expect(RoutesPersistSvc.getRoutes).toHaveBeenCalled()
      expect(localStorage.routes).toBe('test')
      expect(myService.cache).toBe('test')
    })
    it('should use localStorage if network query failed', function() {
      localStorage.routes = 'test'
      myService.getRoutes()
      deferred.reject(false)
      scope.$digest()

      expect(RoutesPersistSvc.getRoutes).toHaveBeenCalled()
      expect(myService.cache).toBe('test')
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
      myService.createRoute(mockRoute, mockRoute, spyDeferred)
      deferred.resolve({data: mockRoute})
      scope.$digest()

      expect(RoutesPersistSvc.addRoute).toHaveBeenCalled()
      expect(RoutesPersistSvc.updateRoute).toHaveBeenCalled()
      expect(spyDeferred.resolve).toHaveBeenCalledWith(mockRoute)
      expect(myService.cache.test).toBe(mockRoute)
    })

    it('should sync route if network query failed', function() {
      spyOn(myService, 'createRouteSync')
      var spyDeferred = {
        resolve: jasmine.createSpy('resolve'),
        reject: jasmine.createSpy('reject')
      }

      myService.createRoute(mockRoute, mockRoute, spyDeferred)
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
      myService.updateRoute(mockRoute, spyDeferred)
      deferred.resolve()
      scope.$digest()

      expect(RoutesPersistSvc.updateRoute).toHaveBeenCalled()
      expect(spyDeferred.resolve).toHaveBeenCalled()
      expect(myService.cache[1]).toBe(mockRoute)
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
      myService.cache = {
        '1': mockRoute
      }
      myService.deleteRoute(mockRoute)
      deferred.resolve()
      scope.$digest()

      expect(RoutesPersistSvc.deleteRoute).toHaveBeenCalled()
      expect(myService.cache).toEqual({})
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
