'use strict'

describe('Service: utilsRouteSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo'))

  // instantiate service
  var utilsRouteSvc, utilsChartSvc
  beforeEach(inject(function(_utilsRouteSvc_, _utilsChartSvc_, _routesSvc_, $q,
  _notificationService_, $rootScope) {
    utilsRouteSvc = _utilsRouteSvc_
    utilsChartSvc = _utilsChartSvc_

    spyOn(utilsChartSvc, 'typeColor').and.returnValue('green')
  }))

  describe('#deleteRoute method', function() {
    var mockRoute, notificationService, scope, deferred, routesSvc

    beforeEach(inject(function(_routesSvc_, $q, _notificationService_,
    $rootScope) {
      mockRoute= { id: 1, name: 'test' }
      notificationService = _notificationService_
      routesSvc = _routesSvc_

      scope = $rootScope.$new()
      deferred = $q.defer()

      spyOn(routesSvc, 'deleteRoute').and.returnValue(deferred.promise)
      spyOn(notificationService, 'success')
      spyOn(notificationService, 'info')
      spyOn(utilsRouteSvc, 'createRouteSync').and.callThrough()
    }))

    it('should call delete Route from routeSvc', function() {
      utilsRouteSvc.deleteRoute(mockRoute)

      expect(routesSvc.deleteRoute).toHaveBeenCalledWith(mockRoute.id)
    })

    it('should notify user in case of success', function() {
      utilsRouteSvc.deleteRoute(mockRoute)
      deferred.resolve()
      scope.$digest()

      expect(notificationService.success).toHaveBeenCalled()
    })

    it('should notify user in case of error based on second param', function() {
      utilsRouteSvc.deleteRoute(mockRoute)
      deferred.reject()
      scope.$digest()

      expect(utilsRouteSvc.createRouteSync).toHaveBeenCalledWith('delete', mockRoute)
      expect(notificationService.info).toHaveBeenCalled()
    })
  })

  it('should #getTypeColor', function() {
    var route = {type: 'test'}
    var output = utilsRouteSvc.getTypeColor(route)

    expect(utilsChartSvc.typeColor).toHaveBeenCalledWith('test')
    expect(output).toMatch('green')

    output = utilsRouteSvc.getTypeColor()
    expect(utilsChartSvc.typeColor).toHaveBeenCalledWith('')
  })

  it('should #getIndoorLabel', function() {
    var route = { rock: 'Indoor' }
    var output = utilsRouteSvc.getIndoorLabel(route)
    expect(output).toMatch('Indoor')

    route = { rock: 'Other' }
    output = utilsRouteSvc.getIndoorLabel(route)
    expect(output).toMatch('Outdoor')
  })

  it('should #getIconRock', function() {
    var route = { rock: 'Indoor' }
    var output = utilsRouteSvc.getIconRock(route)
    expect(output).toMatch('fa-home')

    route = { rock: 'Other' }
    output = utilsRouteSvc.getIconRock(route)
    expect(output).toMatch('fa-sun-o')

    output = utilsRouteSvc.getIconRock()
    expect(output).toMatch('fa-connectdevelop')
  })

  it('should #getIconStatus', function() {
    var route = { status: 'Attempt' }
    var output = utilsRouteSvc.getIconStatus(route)
    expect(output).toMatch('fa-times')

    route = { status: 'Other' }
    output = utilsRouteSvc.getIconStatus(route)
    expect(output).toMatch('fa-check')

    output = utilsRouteSvc.getIconStatus()
    expect(output).toMatch('fa-connectdevelop')
  })
})
