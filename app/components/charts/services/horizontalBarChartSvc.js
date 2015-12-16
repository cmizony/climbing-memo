(function() {
  'use strict'

  /**
  * @module climbingMemoCharts
  * @name climbingMemoCharts.service:horizontalBarChartSvc
  * @description
  * # horizontalBarChartSvc
  * Service of the climbingMemoCharts
  */
  angular.module('climbingMemo.charts')
  .service('horizontalBarChartSvc', horizontalBarChartService)

  horizontalBarChartService.$inject = [
    'utilsChartSvc'
  ]

  function horizontalBarChartService(utilsChartSvc) {
    var HorizontalBarChart = {}

    /**
    * Pre-process data to be rendered on a Calendar Heatmap
    *
    * @params {Array} Flat routes objects
    * @return {Array} Array indexed by dates
    */
    HorizontalBarChart.processData = function(rawData, type) {
      // Filter by Type
      rawData = rawData.filter(function(d) { return d.type === type})

      // Group by Grade
      var grades = utilsChartSvc.arrayToHashtable(rawData,'grade')

      // Convert to array
      var data = []
      for (var grade in grades) {
        data.push({
          name: type,
          grade: grade,
          total: grades[grade].length,
          routesId: _.pluck(grades[grade], 'id')
        })
      }

      // Sort by grade
      data = data.sort(function(a,b) { return utilsChartSvc.compareRouteGrade(a.grade,b.grade) })

      return data
    }

    return HorizontalBarChart
  }
})()
