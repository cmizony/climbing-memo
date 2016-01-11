'use strict'

describe('Directive: profileSummary', function() {

  // load the directive's module
  beforeEach(module('templates'))

  beforeEach(angular.mock.module('climbingMemo.users', function($provide) {
    $provide.service('Auth', function() {
      return {
        getSession: jasmine.createSpy('getSession').and.returnValue({uid: '123'})
      }
    })
  }))

  var element, scope, Auth, deferred, UserSvc
  beforeEach(inject(function($rootScope, $httpBackend, $templateCache,
  $compile, _Auth_, _UsersSvc_, $q) {
    Auth = _Auth_
    UserSvc = _UsersSvc_

    spyOn(UserSvc, 'getProfile').and.callFake(function() {
      deferred = $q.defer()
      return deferred.promise
    })

    scope = $rootScope.$new()
    $httpBackend.whenGET('components/users/views/_profileSummary.html')
    .respond($templateCache.get('/components/users/views/_profileSummary.html'))

    element = angular.element('<profile-summary></profile-summary>')
    $compile(element)(scope)

    $httpBackend.flush()
    scope.$digest()
    element.scope()
  }))

  describe('#initDirective',function() {
    it('should initialize scope variable with profile info', function() {
      expect(scope.profile).toBeDefined()
    })

    it('should refresh scope variable', function() {
      Auth.getSession.calls.reset()
      UserSvc.getProfile.calls.reset()

      scope.initDirective()

      expect(Auth.getSession).toHaveBeenCalled()
      expect(UserSvc.getProfile).toHaveBeenCalledWith('123')

      deferred.resolve({data: 'test'})
      scope.$digest()
      expect(scope.profile).toBe('test')
    })
  })
})
