'use strict'

describe('Service: UsersSvc', function() {

  beforeEach(angular.mock.module('climbingMemo.users', function($provide) {
    $provide.constant('APP_CONFIG', {
      url: 'test.mock/'
    })
  }))

  var myService, httpBackend
  beforeEach(inject(function(UsersSvc, _$httpBackend_) {
    myService = UsersSvc
    httpBackend = _$httpBackend_
  }))

  describe('#getUrl', function() {
    it('should return a string based on app config', function() {
      var url = myService.getUrl('test')
      expect(url).toBe('test.mock/users/test')
    })
  })

  describe('#getProfile', function() {
    it('should GET /users/:id/profile', function() {
      var id = 'myTestId'
      httpBackend.expectGET('test.mock/users/' + id + '/profile.json').respond({
        test: true
      })

      myService.getProfile(id).then(function(result) {
        expect(result.data).toEqual({ test: true })
      })
      httpBackend.flush()
    })
  })

  describe('#updateProfile', function() {
    it('should PUT /users/:id/profile', function() {
      var id = 'myTestId'
      var profile = {
        test: 'test'
      }
      httpBackend.expectPUT('test.mock/users/' + id + '/profile.json', profile)
      .respond({
        test: true
      })

      myService.updateProfile(id, profile).then(function(result) {
        expect(result.data).toEqual({ test: true })
      })
      httpBackend.flush()
    })
  })

})
