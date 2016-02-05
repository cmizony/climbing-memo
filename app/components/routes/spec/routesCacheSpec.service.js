'use strict'

describe('Service: RoutesCache', function() {
  beforeEach(module('siurana.routes'))

  var myService
  beforeEach(inject(function(_RoutesCache_) {
    myService = _RoutesCache_
  }))

  describe('#getData method', function() {
    it('should retrieve cache', function() {
      myService.data = 'test'
      expect(myService.getData()).toBe('test')
    })
  })

  describe('#publishUpdate method', function() {
    it('should call listeners with cached data', function() {
      myService.data = 'test'
      var fakeListener = {
        initController: function() {}
      }
      spyOn(fakeListener, 'initController')
      myService.listeners.push(fakeListener.initController)

      myService.publishUpdate()
      expect(fakeListener.initController).toHaveBeenCalledWith('test')
    })
  })

  describe('#setData method', function() {
    it('should update cached data', function() {
      myService.setData('test','a')
      expect(myService.data).toEqual({a: 'test'})

      myService.setData('test')
      expect(myService.data).toEqual('test')
    })
    it('should publish an update', function() {
      spyOn(myService, 'publishUpdate')
      myService.setData('test')

      expect(myService.publishUpdate).toHaveBeenCalled()
    })
  })

  describe('#removeData method', function() {
    it('should remove cached data', function() {
      spyOn(myService, 'publishUpdate')
      myService.data = {
        a: 'test'
      }
      myService.removeData('a')

      expect(myService.data).toEqual({})
    })
    it('should publish an update', function() {
      spyOn(myService, 'publishUpdate')
      myService.data = {
        a: 'test'
      }
      myService.removeData('a')

      expect(myService.publishUpdate).toHaveBeenCalled()
    })
  })

  describe('#addListener method', function() {
    it('should add callback to listener', function() {
      var fakeListener = function() {}
      myService.addListener(fakeListener)

      expect(myService.listeners.length).toBe(1)
    })
  })
})
