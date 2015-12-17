(function() {
  'use strict'

  /**
  * @module climbingMemoCharts
  * @name climbingMemoCharts.service:treemapChartSvc
  * @description
  * # treemapChartSvc
  * Service in the climbingMemoCharts.
  */
  angular.module('climbingMemo.charts')
  .service('treemapChartSvc', treemapChartService)

  treemapChartService.$inject = [
    'utilsChartSvc'
  ]

  function treemapChartService(utilsChartSvc) {
    var TreemapChartService = {}

    /**
    * Pre-process data to be rendered on a Tree map
    *
    * @params {Array} Flat routes objects
    * @return {Object} Tree of properties
    */
    TreemapChartService.processData = function(rawData) {

      // Tree first level - Routes Types
      var treeTypes = []
      _.mapKeys(utilsChartSvc.arrayToHashtable(rawData, 'type'), function(value, type) {

        // Tree second level - Routes Locations
        var routesLocations = []
        _.mapKeys(utilsChartSvc.arrayToHashtable(value, 'location'), function(value, location) {
          routesLocations.push({
            name: location,
            count: value.length,
            routesId: _.pluck(value, 'id')
          })
        })

        treeTypes.push({
          name: type,
          children: routesLocations
        })
      })

      var data = {}
      data.name = 'Climbs'
      data.children = treeTypes

      return data
    }
    return TreemapChartService
  }
// jscs:disable disallowSemicolons
})();
