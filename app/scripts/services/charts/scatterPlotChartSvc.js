(function() {
  'use strict'

  /**
  * @module climbingMemo
  * @name climbingMemo.service:scatterPlotChartSvc
  * @description
  * # scatterPlotChartSvc
  * Service of the climbingMemo
  */
  angular.module('climbingMemo')
  .service('scatterPlotChartSvc', scatterPlotChartService)

  scatterPlotChartService.$inject = [
    'utilsChartSvc'
  ]

  function scatterPlotChartService(utilsChartSvc) {
    var ScatterPlorChart = {}

    /**
    * Pre-process data to be rendered on a Scatter Plot
    *
    * @params {Array} Flat routes objects
    * @return {Array} Array indexed by dates
    */
    ScatterPlorChart.processData = function(rawData) {

      // Create hashmap of sectrs
      var sectors = utilsChartSvc.arrayToHashtable(rawData,'sector')

      var data = []

      for (var key in sectors) {
        var sector = sectors[key]

        // Calculate dominant type
        var types = utilsChartSvc.arrayGroupBy(sector,'type')

        // Calculate rating average
        var sumRating = 0
        for (var i=0 ; i < sector.length ; i++) {
          sumRating += parseInt(sector[i].rating) || 0
        }

        var avgRating = parseFloat(sumRating) / sector.length

        data.push({
          sector: key,
          avgRating:  avgRating,
          dominantType: types[0],
          totalRoutes: sector.length,
          routesId: _.pluck(sector, 'id')
        })
      }

      return data
    }

    return ScatterPlorChart
  }
})()
