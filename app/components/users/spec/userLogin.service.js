'use strict'

describe('Service: userLogin', function() {

  beforeEach(angular.mock.module('climbingMemo.users', function($provide) {
    $provide.service('Auth', function() {
      return {
        createSession: jasmine.createSpy('createSession'),
        deleteSession: jasmine.createSpy('deleteSession')
      }
    })
    $provide.service('UsersSvc', function() {
      return { updateProfile: jasmine.createSpy('updateProfile') }
    })
    $provide.service('$location', function() {
      return { path: jasmine.createSpy('path') }
    })
  }))

  var myService, Auth, UsersSvc, $location
  beforeEach(inject(function(_Auth_, _UserLoginSvc_, _UsersSvc_, _$location_) {
    myService = _UserLoginSvc_
    Auth = _Auth_
    UsersSvc = _UsersSvc_
    $location = _$location_
  }))

  describe('#successLogin', function() {
    it('should create session, update profile and redirect', function() {
      var session = { uid: 'test' }
      var profile = { name: 'test' }

      myService.successLogin(session, profile)
      expect(Auth.createSession).toHaveBeenCalledWith(session)
      expect(UsersSvc.updateProfile).toHaveBeenCalledWith(session.uid, profile)
      expect($location.path).toHaveBeenCalled()
    })
  })

  describe('#logOut', function() {
    it('should delete session and redirect user', function() {
      myService.logOut()

      expect(Auth.deleteSession).toHaveBeenCalled()
      expect($location.path).toHaveBeenCalledWith('/')
    })

    it('should unauth firebase', function() {
      spyOn(myService.firebase, 'unauth')

      myService.logOut()
      expect(myService.firebase.unauth).toHaveBeenCalled()
    })
  })

  describe('#oauthSuccessCallback', function() {
    it('should reject promise in case of error', function() {
      var deferred = { reject: jasmine.createSpy('reject') }
      myService.oauthSuccessCallback('error', {}, deferred)

      expect(deferred.reject).toHaveBeenCalledWith('error')
    })

    it('should resolve promise with profile when no error', function() {
      var deferred = { resolve: jasmine.createSpy('resolve') }
      var data = {
        uid:       'test',
        provider:  'test',
        test: {
          id:               '123',
          email:            '123',
          displayName:      '123',
          profileImageURL:  '123',
          cachedUserProfile: {
            link:      '123', locale:    '123'
          }
        }
      }
      var expectedProfile = {
        uid:       'test', provider:  'test',
        id:        '123', email:     '123', name:      '123',
        picture:   '123', link:      '123', locale:    '123'
      }

      myService.oauthSuccessCallback(false, data, deferred)
      expect(deferred.resolve).toHaveBeenCalledWith(expectedProfile)
    })
  })

  describe('#googleSignIn', function() {
    it('should call google oauth with popup', function() {
      spyOn(myService.firebase, 'authWithOAuthPopup')
      myService.googleSignIn()

      expect(myService.firebase.authWithOAuthPopup).toHaveBeenCalledWith(
        'google',
        jasmine.any(Function),
        jasmine.any(Object)
      )
    })
  })

})
