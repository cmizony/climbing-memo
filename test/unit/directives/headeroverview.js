'use strict'

describe('Directive: headerOverview', function() {

  // load the directive's module
  beforeEach(module('climbingMemo'))
  beforeEach(module('templates'))

  var element, scope, httpBackend, templateCache

  beforeEach(function() {
    module('climbingMemo', function($provide) {
      $provide.factory('routesSvc', function($q) {
        return {
          getRoutes: function() {
           var deferred = $q.defer()
           deferred.resolve([])
           return deferred.promise
          }
        }
      })
    })
  })

  beforeEach(inject(function($rootScope, $httpBackend, $templateCache) {
    scope = $rootScope.$new()
    httpBackend = $httpBackend
    templateCache = $templateCache
  }))

  it('should get #templateUrl', inject(function($compile) {
    httpBackend.whenGET('components/charts/views/_headerOverview.html')
      .respond(templateCache.get('/components/charts/views/_headerOverview.html'))

    element = $compile('<header-overview></header-overview>')(scope)

    httpBackend.flush()
  }))
})
