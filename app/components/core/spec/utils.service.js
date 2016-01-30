'use strict'

describe('Service: Utils', function() {

  beforeEach(module('climbingMemo.core'))

  // instantiate service
  var myService
  beforeEach(inject(function(_Utils_) {
    myService = _Utils_
  }))

  describe('#parseHref', function() {
    it('should return a url object', function() {
      var url = myService.parseHref('http://hostname.com/pathname#hash')
      expect(url.protocol).toBe('http:')
      expect(url.hostname).toBe('hostname.com')
      expect(url.pathname).toBe('/pathname')
      expect(url.hash).toBe('#hash')
    })

    it('should handle empty ouput', function() {
      expect(myService.parseHref(false)).toBe(false)
    })
  })
})
