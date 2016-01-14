'use strict'

describe('Service: RoutesPersistSvc', function() {
  beforeEach(module('climbingMemo.routes'))
  beforeEach(angular.mock.module('climbingMemo.routes'))

  beforeEach(angular.mock.module('climbingMemo.routes', function($provide) {
    $provide.constant('APP_CONFIG', {
      url: 'test.mock/'
    })
  }))

  var myService, httpBackend
  beforeEach(inject(function(RoutesPersistSvc, _$httpBackend_) {
    myService = RoutesPersistSvc
    httpBackend = _$httpBackend_
  }))

  it('should GET /routes', function() {
    httpBackend.expectGET('test.mock/users/undefined/routes/.json').respond({ test: true })

    myService.getRoutes().then(function(result) {
      expect(result.data).toEqual({ test: true })
    })
    httpBackend.flush()
  })

  it('should GET /routes/:id', function() {
    var id = 'myTestId'
    httpBackend.expectGET('test.mock/users/undefined/routes/myTestId.json').respond({
    test: true })

    myService.getRoute(id).then(function(result) {
      expect(result.data).toEqual({ test: true })
    })
    httpBackend.flush()
  })

  it('should add route POST /routes', function() {
    var route = { name: 'test' }
    httpBackend.expectPOST('test.mock/users/undefined/routes/.json', {
      name: 'test'
    }).respond(true)

    myService.addRoute(route).then(function(result) {
      expect(result.data).toEqual(true)
    })
    httpBackend.flush()
  })

  it('should clean route before adding and updating it', function() {
    var id = 'myTestId'
    var route = {
      name:      'test',
      '$testA':  true,
      '$testB':  true
    }
    httpBackend.expectPOST('test.mock/users/undefined/routes/.json', {
      json: { name: 'test' },
      test: function(data) {
        return _.isEqual(JSON.parse(data), { name: 'test' })
      }
    }).respond(true)
    httpBackend.expectPATCH('test.mock/users/undefined/routes/myTestId.json', {
      json: { name: 'test' },
      test: function(data) {
        return _.isEqual(JSON.parse(data), { name: 'test' })
      }
    }).respond(true)

    myService.addRoute(route).then(function(result) {
      expect(result.data).toEqual(true)
    })
    myService.updateRoute(route, id).then(function(result) {
      expect(result.data).toEqual(true)
    })

    httpBackend.flush()
  })

  it('should delete route DELETE /routes/:id', function() {
    var id = 'myTestId'
    httpBackend.expectDELETE('test.mock/users/undefined/routes/myTestId.json').respond(true)

    myService.deleteRoute(id).then(function(result) {
      expect(result.data).toEqual(true)
    })
    httpBackend.flush()
  })

  it('should clean route before updating it', function() {
  })

  it('should update route PATCH /routes/:id', function() {
    var id = 'myTestId'
    var route = { name: 'test' }

    httpBackend.expectPATCH('test.mock/users/undefined/routes/myTestId.json',
    {name: 'test'}).respond(true)

    myService.updateRoute(route, id).then(function(result) {
      expect(result.data).toEqual(true)
    })
    httpBackend.flush()
  })
})
