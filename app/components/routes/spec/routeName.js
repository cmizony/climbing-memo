'use strict'

describe('Directive: routeName', function() {
  var element, scope, form, deferred, utilsRouteSvc

  beforeEach(module('climbingMemo.routes', function($provide) {
    // Stub for utilsRouteSvc
    utilsRouteSvc = {
      getRoutes: function() {}
    }
    $provide.value('utilsRouteSvc', utilsRouteSvc)
  }))

  beforeEach(inject(function($rootScope, $compile, $q) {
    scope = $rootScope
    deferred = $q.defer()

    spyOn(utilsRouteSvc, 'getRoutes').and.returnValue(deferred.promise)

    element = angular.element(
      '<form name="form">' +
      '<input ng-model="model.test" route-name name="test">' +
      '</form>'
    )
    scope.model = { test: null }
    $compile(element)(scope)
    form = scope.form
  }))

  it('should query utilsRouteSvc to get routes', function() {
    form.test.$setViewValue('Route')
    scope.$digest()

    expect(utilsRouteSvc.getRoutes).toHaveBeenCalled()
  })

  it('should validate the form if name is unique', function() {
    var routes = [{ name: 'Route2' }]

    form.test.$setViewValue('Route1')
    deferred.resolve(routes)
    scope.$digest()

    expect(scope.model.test).toEqual('Route1')
    expect(form.test.$valid).toBe(true)
  })

  it('should not validate the form if name exists', function() {
    var routes = [{ name: 'Route1' }]

    form.test.$setViewValue('Route1')
    deferred.resolve(routes)
    scope.$digest()

    expect(scope.model.test).toBeUndefined()
    expect(form.test.$valid).toBe(false)
  })


  it('should validate the form if routes are not available', function() {
    form.test.$setViewValue('Route1')
    deferred.reject()
    scope.$digest()

    expect(scope.model.test).toEqual('Route1')
    expect(form.test.$valid).toBe(true)
  })
})
