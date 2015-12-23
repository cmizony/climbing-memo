'use strict'

describe('Directive: routeLocation', function() {
  var element, scope, httpBackend, form
  var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

  beforeEach(module('climbingMemo'))

  beforeEach(inject(function($rootScope, $compile, $httpBackend) {
    scope = $rootScope
    httpBackend = $httpBackend

    element = angular.element(
      '<form name="form">' +
      '<input ng-model="model.test" route-location name="test">' +
      '</form>'
    )
    scope.model = { test: null }
    $compile(element)(scope)
    form = scope.form
  }))

  it('should query google services with right location', function() {
    httpBackend.expectGET(baseUrl + 'Paris').respond({})
    form.test.$setViewValue('Paris')
    scope.$digest()
    httpBackend.flush()
  })

  it('should validate the form if location exists', function() {
    httpBackend.whenGET(baseUrl + 'Paris').respond({
      status: 'OK'
    })

    form.test.$setViewValue('Paris')
    scope.$digest()
    httpBackend.flush()

    expect(scope.model.test).toEqual('Paris')
    expect(form.test.$valid).toBe(true)
  })

  it('should not validate the form if location does not exist', function() {
    httpBackend.whenGET(baseUrl + 'Paris').respond({
      status: 'ZERO_RESULTS'
    })

    form.test.$setViewValue('Paris')
    scope.$digest()
    httpBackend.flush()

    expect(scope.model.test).toBeUndefined()
    expect(form.test.$valid).toBe(false)
  })

  it('should validate the form if location is empty', function() {
    form.test.$setViewValue('')
    scope.$digest()

    expect(scope.model.test).toEqual('')
    expect(form.test.$valid).toBe(true)
  })

  it('should validate the form if google is not available', function() {
    httpBackend.whenGET(baseUrl + 'Paris').respond(404, {})

    form.test.$setViewValue('Paris')
    scope.$digest()
    httpBackend.flush()

    expect(scope.model.test).toEqual('Paris')
    expect(form.test.$valid).toBe(true)
  })
})
