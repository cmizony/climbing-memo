'use strict'

describe('Directive: routesTable', function() {

  beforeEach(module('templates'))
  beforeEach(angular.mock.module('siurana.table'))

  var element, scope
  beforeEach(inject(function($rootScope, $httpBackend, $templateCache,
  $compile) {

    scope = $rootScope.$new()
    $httpBackend.whenGET('components/table/views/_routesTable.html')
    .respond($templateCache.get('/components/ble/views/_routesTable.html'))

    element = angular.element('<routes-table></routes-table>')
    $compile(element)(scope)

    $httpBackend.flush()
    scope.$digest()
    scope = element.isolateScope()
  }))

  it('should compile', function() {
    expect(element).toBeDefined()
  })
})
