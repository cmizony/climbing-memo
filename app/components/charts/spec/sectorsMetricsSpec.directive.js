'use strict'

describe('Directive: sectorsMetrics', function() {

  // load the directive's module
  beforeEach(module('siurana.charts'))
  beforeEach(module('templates'))

  var element, scope, httpBackend, templateCache

  beforeEach(function() {
    module('siurana', function($controllerProvider) {
      $controllerProvider.register('ModalsliderCtrl', function() {
        // Controller Mock
      })
    })
  })

  beforeEach(inject(function($rootScope, $httpBackend, $templateCache) {
    scope = $rootScope.$new()
    httpBackend = $httpBackend
    templateCache = $templateCache
  }))

  it('should #openRouteModal', inject(function($compile) {
    httpBackend.whenGET('components/charts/views/_sectorsMetrics.html')
      .respond(templateCache.get('/components/charts/views/_sectorsMetrics.html'))
    httpBackend.whenGET('components/routes/views/_cardRoute.html').respond('')

    element = angular.element('<sectors-metrics metrics="[{}]"></sectors-metrics>')
    element = $compile(element)(scope)
    httpBackend.flush()

    httpBackend.expectGET('components/routes/views/sliderModal.html')
    httpBackend.whenGET('components/routes/views/sliderModal.html')
      .respond(templateCache.get('/components/routes/views/sliderModal.html'))
    element.find('a').click()

    httpBackend.flush()
  }))
})
