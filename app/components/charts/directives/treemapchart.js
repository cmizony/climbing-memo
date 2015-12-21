(function() {
  'use strict'

  /**
  * @module climbingMemoCharts
  * @name climbingMemoCharts.directive:treemapChart
  * @description
  * # treemapChart
  */
  angular.module('climbingMemo.charts')
  .directive('treemapChart', treemapChartDirective)

  treemapChartDirective.$inject = [
    '$window',
    '$uibModal',
    'treemapChartSvc',
    'utilsChartSvc'
  ]

  function treemapChartDirective($window, $uibModal, treemapChartSvc,
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

          var chart = scope.getTreemap()
          .data(treemapChartSvc.processData(rawData))
          .width(scope.width || element.parent().width())
          .height(300)

          d3.select(element.find('#chart-' + ID)[0]).call(chart)
        }


        /**
        * Create and return a TreeMap chart
        * created using D3.js
        *
        * @return {Function} Callable object to create chart
        */
        scope.getTreemap = function() {
          var data = []
          var width = 800
          var height = 600

          function my(container) {

            var w,h,xScale,yScale,root,node,treemap,svg,tip,tipZoom

            setConfig()
            addTreeMap()
            addCells()
            applyStyle()

            function setConfig() {
              w = width
              h = height
              xScale = d3.scale.linear().range([0, w])
              yScale = d3.scale.linear().range([0, h])

              node = root = data
            }

            function addTreeMap() {
              treemap = d3.layout.treemap()
              .round(false)
              .size([w, h])
              .sticky(true)
              .value(function(d) { return d.count })

              container.select("div").remove()

              svg = container.append("div")
              .attr("class", "chart")
              .style("width", w + "px")
              .style("height", h + "px")
              .append("svg:svg")
              .attr("width", w)
              .attr("height", h)
              .append("svg:g")
              .attr("transform", "translate(.5,.5)")

              tip = d3.tip()
              .attr('class', 'd3-tip hidden-xs')
              .offset([-10, 0])
              .html(function(d) {
                var html = ''
                var parentName = d.parent ? d.parent.name : ''
                html += '<span style="color:' + utilsChartSvc.typeColor(parentName) + '">'
                html += parentName + "</span> "
                html += d.name + ": <span style='color:red'>" + d.count + "</span>"
                return html
              })

              tipZoom = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                var html = ''
                html += d.name + ": <span style='color:red'>" + d.count + "</span>"
                return html
              })

              svg.call(tipZoom)
              svg.call(tip)
            }


            function addCells() {

              var nodes = treemap.nodes(root)
              .filter(function(d) { return !d.children })

              var cell = svg.selectAll("g")
              .data(nodes)
              .enter().append("svg:g")
              .attr("class", "cell")
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

              cell.append("svg:rect")
              .attr("width", function(d) { return Math.max(d.dx - 1,0); })
              .attr("height", function(d) { return Math.max(d.dy - 1,0); })
              .on("click", function(d) { return zoom(node == d.parent ? root : d.parent); })
              .style("fill", function(d) {
                if (!d.parent) {
                  return "#f5f5f5"
                }
                return utilsChartSvc.typeColor(d.parent.name)
              })
              .on("mouseover", function(d) {
                if (!d.children) {
                  /* jshint ignore:start */
                  $(this).css({'opacity':0.8})
                  /* jshint ignore:end */
                  tipZoom.show(d)
                }
              })
              .on("mouseout", function(d) {
                if (!d.children) {
                  /* jshint ignore:start */
                  $(this).css({'opacity':1})
                  /* jshint ignore:end */
                  tipZoom.hide(d)
                }
              })

              cell.append("svg:text")
              .attr("x", function(d) { return d.dx / 2; })
              .attr("y", function(d) { return d.dy / 2; })
              .attr("dy", ".35em")
              .attr("text-anchor", "middle")
              .text(function(d) { return d.name; })
              .style("opacity", function(d) {
                d.w = this.getComputedTextLength()
                return d.dx > d.w ? 1 : 0
              })
              .on('click', function(d) {
                scope.openSliderModal(d.routesId)
              })
              .on("mouseover", function(d) {
                if (!d.children) {
                  tip.show(d)
                }
              })
              .on("mouseout", function(d) {
                if (!d.children) {
                  tip.hide(d)
                }
              })
            }

            function applyStyle() {
              svg.selectAll('text').style({
                'cursor': 'pointer'
              })

              svg.selectAll('rect').style({'cursor': 'pointer'})
            }

            function zoom(d) {
              var kx = w / d.dx, ky = h / d.dy
              xScale.domain([d.x, d.x + d.dx])
              yScale.domain([d.y, d.y + d.dy])

              var t = svg.selectAll("g.cell").transition()
              .duration(d3.event.altKey ? 7500 : 750)
              .attr("transform", function(d) {
                return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"
              })

              t.select("rect")
              .attr("width", function(d) { return Math.max(kx * d.dx - 1,0) })
              .attr("height", function(d) { return Math.max(ky * d.dy - 1,0) })

              t.select("text")
              .attr("x", function(d) { return kx * d.dx / 2 })
              .attr("y", function(d) { return ky * d.dy / 2 })
              .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0 })

              node = d
              d3.event.stopPropagation()
            }
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
