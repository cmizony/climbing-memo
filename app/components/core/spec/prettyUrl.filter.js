'use strict'

describe('Filter: prettyUrl', function() {
  beforeEach(module('climbingMemo.core'))

  var myFilter
  beforeEach(inject(function($filter) {
    myFilter = $filter('prettyUrl')
  }))

  describe('#prettyUrl', function() {
    it('should extract hostname and pathname', function() {
      expect(myFilter('http://hostname.com/pathname'))
        .toBe('hostname.com/pathname')
    })

    it('should remove starting www', function() {
      expect(myFilter('http://www.hostname.com/pathname'))
        .toBe('hostname.com/pathname')
    })

    it('should truncate string length if exists', function() {
      expect(myFilter('http://www.hostname.com/pathname',11))
        .toBe('hostname...')
    })

    it('should return same url if not valid', function() {
      expect(myFilter('ht//www.hostname'))
        .toBe('ht//www.hostname')
    })
  })
})
