(function() {
  'use strict'

  /**
  * @module climbingMemoCharts
  * @name climbingMemoCharts.directive:scatterPlotChart
  * @description
  * # scatterPlotChart
  * Directive of the climbingMemoCharts
  */
  angular.module('climbingMemo.charts')
  .directive('scatterPlotChart', scatterPlotChartDirective)

  scatterPlotChartDirective.$inject = [
    '$uibModal',
    '$window',
    'scatterPlotChartSvc',
    'utilsChartSvc'
  ]

  function scatterPlotChartDirective($uibModal, $window, scatterPlotChartSvc,
  utilsChartSvc) {
    // Private 5 digit chart ID
    var ID = _.random(10000, 99999)

    return {
      scope: {
        routes: '=',
        width: '='
      },
      restrict: 'E',
      template: '<div id="chart-' + ID + '"></div>',
      link: function(scope, element) {

        function initDirective() {
          scope.renderChart(scope.routes)
        }

        angular.element($window).bind('resize', function() {
          initDirective()
        })

        // Draw chart when routes change
        scope.$watch('routes', function(rawData) {
          scope.renderChart(rawData)
        })

        /**
        * Open a modal to display routes card
        *
        * @method openSliderModal
        */
        scope.openSliderModal = function(routesId) {
          $uibModal.open({
            templateUrl: 'views/sliderModal.html',
            controller: 'ModalsliderCtrl',
            size: 'md',
            resolve: {
              routesId: function() {
                return routesId
              }
            }
          })
        }

        /**
        * @method renderChart
        * Create the chart in the template div
        *
        * @param {Array} rawData
        */
        scope.renderChart = function(rawData) {
          rawData = rawData || []

          var chart = scope.getScatterPlot()
          .data(scatterPlotChartSvc.processData(rawData))
          .width(scope.width || element.parent().width())
          .height(300)

          d3.select(element.find('#chart-' + ID)[0]).call(chart)
        }

        scope.getScatterPlot = function() {
          var data = []
          var width = 800
          var height = 600

          function my(container) {

            var marginFocus = {top: 20, right: 20, bottom: 55, left: 30},
            widthChart      = width - marginFocus.left - marginFocus.right,
            heightChart     = height - marginFocus.top - marginFocus.bottom

            var xFocus = d3.scale.linear().range([0, widthChart]),
            yFocus = d3.scale.linear().range([heightChart, 0])

            var xAxisFocus = d3.svg.axis()
            .scale(xFocus)
            .orient("bottom")
            .tickFormat(d3.format("d"))

            var yAxisFocus = d3.svg.axis()
            .scale(yFocus)
            .orient("left")
            .tickFormat(d3.format("d"))

            var focus

            //REMOVE SVG
            container.select("svg").remove()

            // CREATE NEW SVG
            var svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)

            focus = svg.append("g")
            .attr("transform", "translate(" + marginFocus.left + "," + marginFocus.top + ")")

            // CREATE DOMAIN
            xFocus.domain([0,d3.max(data, function(d) { return d.totalRoutes })])
            yFocus.domain([0,5])

            // TOOLTIP DIV
            var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              var html = ''
              html += '<span class="hidden-xs" style="color:'
              html += utilsChartSvc.typeColor(d.dominantType) + '">'
              html += d.dominantType + "</span> "
              html += d.sector + ' ' + d.avgRating.toFixed(1) + ' <i class="fa fa-star-o"></i>'
              html += " : <span style='color:red'>" + d.totalRoutes + "</span>"
              return html
            })

            svg.call(tip)

            // DOTS
            focus.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot-usage")
            .attr("r", 10)
            .attr("cx", function(d) { return xFocus(d.totalRoutes) })
            .attr("cy", function(d) { return yFocus(d.avgRating) })
            .style("fill", function(d) { return utilsChartSvc.typeColor(d.dominantType); })
            .style('cursor', 'pointer')
            .on('click', function(d) {
              scope.openSliderModal(d.routesId)
            })
            .on("mouseover", function(d) {
              $(this).css({'opacity':0.8})
              tip.show(d)
            })
            .on("mouseout", function(d) {
              $(this).css({'opacity':1})
              tip.hide(d)
            })

            focus.append("g")
            .attr("class", "y axis")
            .call(yAxisFocus)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Average Rating")

            focus.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + heightChart + ")")
            .call(xAxisFocus)
            .append("text")
            .attr("x", widthChart)
            .attr("y", "-6")
            .style("text-anchor", "end")
            .text("Total Routes")

            svg.selectAll('.axis line, .axis path')
            .style({
              'stroke': 'Black',
              'fill': 'none',
              'stroke-width': '1px',
              'shape-rendering':'crispEdges'
            })

          }


          my.data = function(value) {
            if (!arguments.length) {
              return data
            }
            data = value
            return my
          }

          my.width = function(value) {
            if (!arguments.length) {
              return width
            }
            width = value <= 0 ? width : value
            return my
          }

          my.height = function(value) {
            if (!arguments.length) {
              return height
            }
            height = value <= 0 ? height : value
            return my
          }
          return my
        }

        initDirective()
      }
    }
  }
// jscs:disable disallowSemicolons
})();
