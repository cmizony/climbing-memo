(function() {
  'use strict'

  /**
  * @module climbingMemoCharts
  * @name climbingMemoCharts.directive:horizontalBarChart
  * @description
  * # horizontalBarChart
  * Directive of the climbingMemoCharts
  */
  angular.module('climbingMemo.charts')
  .directive('horizontalBarChart', horizontalBarChartDirective)

  horizontalBarChartDirective.$inject = [
    '$modal',
    '$window',
    'horizontalBarChartSvc',
    'utilsChartSvc'
  ]

  function horizontalBarChartDirective($modal, $window, horizontalBarChartSvc,
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
      link: function(scope, element, attrs) {

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
          $modal.open({
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
          var arrayTypes = utilsChartSvc.arrayGroupBy(rawData,"type")
          var type = arrayTypes.length > 0 ? arrayTypes[0] : 'Sport Lead'

          var chart = scope.getHorizontalBar()
          .data(horizontalBarChartSvc.processData(rawData, type))
          .width(scope.width || element.parent().width())
          .height(300)

          d3.select(element.find('#chart-' + ID)[0]).call(chart)
        }

        /**
        * Create and return a horizontal Bar chart
        * created using D3.js
        *
        * @return {Function} Callable object to create chart
        */
        scope.getHorizontalBar = function() {
          var data = []
          var width = 800
          var height = 600
          var heightBar = 40

          function my(container) {

            setDimensions()
            setupAxis()

            addSvgChart()
            addBarChartData()
            addAxes()

            applyStyle()

            var margin,heightChart,widthChart

            function setDimensions() {
              margin = {top: 30, right: 10, bottom: 10, left: 10}
              widthChart = width - margin.left - margin.right
              heightChart = height - margin.top - margin.bottom
            }


            var xAxis, xScale, yScale, maxRoutes

            function setupAxis() {
              maxRoutes = d3.max(data, function(d) { return d.total}) || 0

              xScale = d3.scale.linear()
              .range([0, widthChart])
              .domain([-maxRoutes,maxRoutes])

              yScale = d3.scale.ordinal()
              .rangeRoundBands([0, heightChart], 0.1)
              .domain(data.map(function(d) { return d.grade }))

              xAxis = d3.svg.axis()
              .scale(xScale)
              .tickFormat(function(d) { return (d % 1 === 0) ? Math.abs(d) : '' })
              .orient("top")
            }

            var svg,tip

            function addSvgChart() {
              container.select("svg").remove()

              svg = container.append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

              tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                var html = ''
                html += '<span style="color:' + utilsChartSvc.typeColor(d.name) + '">'
                html += d.name + "</span> "
                html += d.grade + " : <span style='color:red'>" + d.total + "</span>"
                return html
              })

              svg.call(tip)
            }



            function addBarChartData() {
              // Create rects
              svg.selectAll(".bar")
              .data(data)
              .enter().append("rect")
              .attr("x", function(d) { return xScale(-d.total); })
              .attr("y", function(d) { return yScale(d.grade); })
              .attr("width", function(d) { return xScale(d.total) - xScale(-d.total) })
              .attr("height", yScale.rangeBand())
              .style("fill", function(d) { return utilsChartSvc.typeColor(d.name) })
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

            }

            function addAxes() {
              svg.append("g")
              .attr("class", "x axis")
              .call(xAxis)

              svg.append("g")
              .attr("class", "y axis")
              .append("line")
              .attr("x1", xScale(0))
              .attr("x2", xScale(0))
              .attr("y2", heightChart)
            }

            function applyStyle() {
              svg.selectAll('.axis line, path').style({
                'stroke': 'Black',
                'fill': 'none',
                'stroke-width': '1px',
                'shape-rendering':'crispEdges'
              })

            }

            return my
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
})()
