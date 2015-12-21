(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.service:mapChartSvc
  * @description
  * # mapChartSvc
  * Service in the climbingMemo.
  */
  angular.module('climbingMemo')
  .service('mapChartSvc', mapChartService)

  mapChartService.$inject = [
    'utilsChartSvc'
  ]

  function mapChartService(utilsChartSvc) {
    var MapChart = {}

    /**
    * Pre-process data to be rendered on a Map
    *
    * @params {Array} Flat routes objects
    * @return {Array} Array of locations
    */
    MapChart.processData = function(rawData) {
      // Create hashmap of sites
      var locations = utilsChartSvc.arrayToHashtable(rawData,'location')

      // Calculate metrics for sites
      var data = []
      _.forOwn(locations, function(locationRoutes, key) {
        var metrics = []
        var sectors = utilsChartSvc.arrayToHashtable(locationRoutes,'sector')

        _.forOwn(sectors, function(sectorRoutes, sector) {
          metrics.push({
            sector: sector,
            routesId: _.pluck(sectorRoutes, 'id'),
            count: sectorRoutes.length,
            type: utilsChartSvc.arrayGroupBy(sectorRoutes, 'type')[0],
            rating: (_.reduce(sectorRoutes, function(result, n) {
              return result += n.rating
            }, 0) / sectorRoutes.length).toFixed(1)
          })
        })
        metrics.sort(function(a,b) { return a.count < b.count; })

        data.push({
          name: key,
          coords: {
            latitude: locationRoutes[0].latitude,
            longitude: locationRoutes[0].longitude
          },
          metrics: metrics
        })
      })

      return data
    }

    return MapChart
  }
// jscs:disable disallowSemicolons
})();
