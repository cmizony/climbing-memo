'use strict'

describe('Directive: routeMedia', function() {

  // load the directive's module
  beforeEach(module('templates'))

  beforeEach(angular.mock.module('climbingMemo.routes', function($provide) {
    $provide.service('RoutesUtilsSvc', function() {
      return {
        getRouteMedia: function() {}
      }
    })
  }))

  var element, scope
  beforeEach(inject(function($rootScope, $httpBackend, $templateCache,
  $compile, $q) {

    scope = $rootScope.$new()
    $httpBackend.whenGET('components/routes/views/_routeMedia.html')
    .respond($templateCache.get('/components/routes/views/_routeMedia.html'))

    element = angular.element('<route-media></route-media>')
    $compile(element)(scope)

    $httpBackend.flush()
    scope.$digest()
    scope = element.isolateScope()
  }))

  describe('#openMedia',function() {
    xit('should do somethinf', function() {
    })
  })
  describe('#deleteMedia',function() {
    xit('should do somethinf', function() {
    })
  })
  describe('#updateMedia',function() {
    xit('should do somethinf', function() {
    })
  })
})
