(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.service:verticalBarChartSvc
  * @description
  * # verticalBarChartSvc
  * Service of the siuranaCharts
  */
  angular.module('siurana.charts')
  .service('verticalBarChartSvc', verticalBarChartService)

  verticalBarChartService.$inject = []

  function verticalBarChartService() {
    var VerticalBarChart = {}

    /**
    * Pre-process data to be rendered on a Calendar Heatmap
    *
    * @params {Array} Flat routes objects
    * @return {Array} Array indexed by dates
    */
    VerticalBarChart.processData = function(rawData) {
      // Filter the last 12 months
      rawData = rawData.filter(function(route) {
        return moment().diff(moment(route.date, 'MM-DD-YYYY'),'months') < 12
      })

      // Group by Month-Year
      var months = []
      var month
      var monthDate

      for (var i=0 ; i < rawData.length ; i++) {

        var route = rawData[i]

        // Date format MM/DD/YYYY
        var splitDate = route.date.split("/")
        monthDate = splitDate[0] + splitDate[2]

        // Month name
        if (!(monthDate in months)) {
          months[monthDate] = {
            date:monthDate,
            type: []
          }
        }

        // Sector name in month
        month = months[monthDate]

        if (!(route.type in month.type)) {
          month.type[route.type] = {
            name: route.type,
            sum: 0,
            y0: 0,
            y1: 0,
            routesId: []
          }
        }

        month.type[route.type].sum += 1
        month.type[route.type].routesId.push(route.id)

      }

      // Calculate y0 & y1 per type
      for (monthDate in months) {

        month = months[monthDate]
        var barSum = 0

        for (var type in month.type) {

          var barItem = month.type[type]

          barItem.y0 = barSum
          barSum += barItem.sum
          barItem.y1 = barSum
        }
      }

      // Convert Object to Array
      var data = []
      data = Object.keys(months).map(function(keyA) {
        var entry = months[keyA]
        entry.type = Object.keys(entry.type).map(function(keyB) {
          return entry.type[keyB]
        })
        return entry
      })

      return data
    }
    return VerticalBarChart
  }
// jscs:disable disallowSemicolons
})();
