'use strict'

describe('Service: auth', function() {
  beforeEach(module('climbingMemo.core'))
  beforeEach(angular.mock.module('climbingMemo.core'))

  var myService, $localStorage
  beforeEach(inject(function(Auth, _$localStorage_) {
    myService = Auth
    $localStorage = _$localStorage_
  }))

  describe('#createSession', function() {
    it('should store object on localStorage', function() {
      var session = { id: 'test' }
      myService.createSession(session)

      expect($localStorage.mySession).toEqual(session)
    })
  })

  describe('#deleteSession', function() {
    it('should remove the localStorage mySession object', function() {
      $localStorage.mySession = { id: 'test' }
      $localStorage.other = 'test'
      myService.deleteSession()

      expect($localStorage.mySession).toBeUndefined()
      expect($localStorage.other).toBeDefined()
    })
  })

  describe('#getSession', function() {
    it('should retrieve the cachedSession if exists', function() {
      var session = { id: 'test' }
      myService.cachedSession = session

      expect(myService.getSession()).toEqual(session)
    })

    it('should return localStorage mySession when no cache', function() {
      var session = { id: 'test' }
      $localStorage.mySession = { id: 'test' }
      myService.cachedSession = false

      expect(myService.getSession()).toEqual(session)
    })

    it('should return empty object when no session exist', function() {
      myService.cachedSession = false
      expect(myService.getSession()).toEqual({})
    })
  })

  describe('#isLoggedIn', function() {
    it('should be true when token exists and not expired', function() {
      $localStorage.mySession = {
        token: '1234',
        expires: new Date().getTime() / 1000 + 10
      }

      expect(myService.isLoggedIn()).toBe(true)
    })

    it('should be false when token exists but expired', function() {
      $localStorage.mySession = {
        token: '1234',
        expires: new Date().getTime() / 1000 - 10
      }

      expect(myService.isLoggedIn()).toBe(false)
    })
  })

  describe('#getToken', function() {
    it('should return false when not logged in', function() {
      expect(myService.getToken()).toBe(false)
    })

    it('should return the token when logged in', function() {
      $localStorage.mySession = {
        token: '1234',
        expires: new Date().getTime() / 1000 + 10
      }

      expect(myService.getToken()).toBe('1234')
    })
  })
})
