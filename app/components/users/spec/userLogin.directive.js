'use strict'

describe('Directive: userLogin', function() {

  // load the directive's module
  beforeEach(module('templates'))

  beforeEach(angular.mock.module('climbingMemo.users', function($provide) {
    $provide.service('Auth', function() {
      return {
        isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(function() { return true }),
        getSession: jasmine.createSpy('getSession').and.returnValue({name: 'test'})
      }
    })
  }))

  var element, scope, Auth, deferred, UserLoginSvc
  beforeEach(inject(function($rootScope, $httpBackend, $templateCache,
  $compile, _Auth_, _UserLoginSvc_, $q) {
    Auth = _Auth_
    UserLoginSvc = _UserLoginSvc_

    spyOn(UserLoginSvc, 'googleSignIn').and.callFake(function() {
      deferred = $q.defer()
      return deferred.promise
    })

    scope = $rootScope.$new()
    $httpBackend.whenGET('components/users/views/_userLogin.html')
    .respond($templateCache.get('/components/users/views/_userLogin.html'))

    element = angular.element('<user-login></user-login>')
    $compile(element)(scope)

    $httpBackend.flush()
    scope.$digest()
  }))

  describe('#initDirective',function() {
    it('should initialize scope variable with session info', function() {
      expect(scope.name).toBeDefined()
      expect(scope.isLoggedIn).toBeDefined()
    })

    it('should refresh scope variable', function() {
      Auth.isLoggedIn.calls.reset()
      scope.isLoggedIn()
      expect(Auth.isLoggedIn).toHaveBeenCalled()

      Auth.getSession.calls.reset()
      scope.initDirective()
      expect(Auth.getSession).toHaveBeenCalled()
    })
  })

  describe('#signIn',function() {
    it('should call the right provider', function() {
      scope.signIn('google')
      expect(UserLoginSvc.googleSignIn).toHaveBeenCalled()
    })
    it('should init the directive on success', function() {
      spyOn(scope, 'initDirective')
      scope.signIn('google')
      deferred.resolve({name: 'test'})
      scope.$digest()
      expect(scope.initDirective).toHaveBeenCalled()
    })
  })
})
