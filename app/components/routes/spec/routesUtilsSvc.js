'use strict'

describe('Service: RoutesUtilsSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo.routes'))

  // instantiate service
  var RoutesUtilsSvc
  beforeEach(inject(function(_RoutesUtilsSvc_) {
    RoutesUtilsSvc = _RoutesUtilsSvc_
  }))

  it('should #getTypeColor', function() {
    expect(RoutesUtilsSvc.getTypeColor('Sport lead')).toMatch(/[a-z]+/)
    expect(RoutesUtilsSvc.getTypeColor('Boulder')).toMatch(/[a-z]+/)
    expect(RoutesUtilsSvc.getTypeColor('Traditional')).toMatch(/[a-z]+/)
    expect(RoutesUtilsSvc.getTypeColor('Multi-pitch')).toMatch(/[a-z]+/)
    expect(RoutesUtilsSvc.getTypeColor('Top rope')).toMatch(/[a-z]+/)
    expect(RoutesUtilsSvc.getTypeColor('')).toMatch(/[a-z]+/)
  })

  it('should #getIndoorLabel', function() {
    var route = { rock: 'Indoor' }
    var output = RoutesUtilsSvc.getIndoorLabel(route)
    expect(output).toMatch('Indoor')

    route = { rock: 'Other' }
    output = RoutesUtilsSvc.getIndoorLabel(route)
    expect(output).toMatch('Outdoor')
  })

  it('should #getIconRock', function() {
    var route = { rock: 'Indoor' }
    var output = RoutesUtilsSvc.getIconRock(route)
    expect(output).toMatch('fa-home')

    route = { rock: 'Other' }
    output = RoutesUtilsSvc.getIconRock(route)
    expect(output).toMatch('fa-sun-o')

    output = RoutesUtilsSvc.getIconRock()
    expect(output).toMatch('fa-connectdevelop')
  })

  it('should #getIconStatus', function() {
    var route = { status: 'Attempt' }
    var output = RoutesUtilsSvc.getIconStatus(route)
    expect(output).toMatch('fa-times')

    route = { status: 'Other' }
    output = RoutesUtilsSvc.getIconStatus(route)
    expect(output).toMatch('fa-check')

    output = RoutesUtilsSvc.getIconStatus()
    expect(output).toMatch('fa-connectdevelop')
  })
})
