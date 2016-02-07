(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.app:Module
  * @description
  * Module creation for charts and set dependencies
  */
  angular.module('siurana.charts', [
    'siurana.routes',
    'ngRoute',
    'ui.bootstrap'
  ])
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCore
  * @name siuranaCore.app:Module
  * @description
  * Module creation for core
  * Constain APP_CONFIG that is being generated on the build
  */
  angular.module('siurana.core', [
    'ngStorage'
  ])

  angular.module('siurana.core')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor')
  }])

// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaMap
  * @name siuranaMap.app:Module
  * @description
  * Module creation for map
  */
  angular.module('siurana.map', [
    'siurana.core',
    'siurana.charts',
    'siurana.routes',
    'ngRoute',
    'uiGmapgoogle-maps',
    'ui.bootstrap'
  ])
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.app:Module
  * @description
  * Module creation for routes
  */
  angular.module('siurana.routes', [
    'siurana.core',
    'siurana.users',
    'hc.marked',
    'jlareau.pnotify',
    'ui.bootstrap',
    'ngRoute',
    'ngStorage'
  ])
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaTable
  * @name siuranaTable.app:Module
  * @description
  * Module creation for table
  */
  angular.module('siurana.table', [
    'siurana.core',
    'siurana.routes',
    'siurana.charts',
    'datatables',
    'datatables.bootstrap',
    'ngRoute',
    'ui.bootstrap'
  ])
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaTimeline
  * @name siuranaTimeline.app:Module
  * @description
  * Module creation for timeline
  */
  angular.module('siurana.timeline', [
    'siurana.core',
    'siurana.routes',
    'siurana.charts',
    'ngRoute',
    'angular-timeline',
    'ui.bootstrap'
  ])
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaUsers
  * @name siuranaUsers.app:Module
  * @description
  * Module creation for utils
  */
  angular.module('siurana.users', [
    'siurana.core',
    'jlareau.pnotify'
  ])
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.controller:chartsCtrl
  * @description
  * # chartsCtrl
  * Controller of the siuranaCharts
  */
  angular.module('siurana.charts')
  .controller('chartsCtrl', chartsController)

  chartsController.$inject = [
    'RoutesSvc',
    'ResolvedRoutes'
  ]

  function chartsController(RoutesSvc, ResolvedRoutes) {
    /* jshint validthis:true */
    var vm = this

    /**
    * Initialize controller
    *
    * @method initController
    * @param {Object} data
    */
    vm.initController = function(data) {
      vm.routes = _.toArray(data)
    }

    vm.initController(ResolvedRoutes)
    RoutesSvc.subscribeForUpdates(vm.initController)
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.controller:overviewCtrl
  * @description
  * # overviewCtrl
  * Controller of the siuranaCharts
  */
  angular.module('siurana.charts')
  .controller('overviewCtrl', overviewController)

  overviewController.$inject = [
    '$scope',
    '$log',
    'utilsChartSvc',
    'RoutesSvc'
  ]

  function overviewController($scope, $log, utilsChartSvc, RoutesSvc) {

    // Get Data
    RoutesSvc.getRoutes().then(function(data) {
      $scope.initController(data)
      RoutesSvc.subscribeForUpdates($scope.initController)
    })

    /**
    * Initialize Controller
    * @method initController
    * @param {Object} data
    */
    $scope.initController = function(data) {
      var arrayRoutes = _.toArray(data)
      var arraySectors = utilsChartSvc.arrayGroupBy(arrayRoutes,"sector")
      var arrayTypes = utilsChartSvc.arrayGroupBy(arrayRoutes,"type")

      $scope.routes = arrayRoutes
      $scope.metrics = {
        count: arrayRoutes.length,
        favoriteSector: arraySectors[0],
        favoriteType: arrayTypes[0]
      }
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.directive:gridCharts
  * @description
  * # gridCharts
  */
  angular.module('siurana.charts')
  .directive('gridCharts', gridChartsDirective)

  gridChartsDirective.$inject = [
  ]

  function gridChartsDirective() {
    return {
      templateUrl: 'components/charts/views/_gridCharts.html',
      restrict: 'E',
      scope: {
        routes: '='
      }
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.directive:headerOverview
  * @description
  * # headerOverview
  * Directive of the siuranaCharts
  * @example
  * <header-overview></header-overview>
  */
  angular.module('siurana.charts')
  .directive('headerOverview', headerOverviewDirective)

  headerOverviewDirective.$inject = []

  function headerOverviewDirective() {
    return {
      scope: true,
      restrict: 'E',
      templateUrl: 'components/charts/views/_headerOverview.html',
      controller: 'overviewCtrl'
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.directive:horizontalBarChart
  * @description
  * # horizontalBarChart
  * Directive of the siuranaCharts
  */
  angular.module('siurana.charts')
  .directive('horizontalBarChart', horizontalBarChartDirective)

  horizontalBarChartDirective.$inject = [
    '$uibModal',
    '$window',
    'horizontalBarChartSvc',
    'utilsChartSvc'
  ]

  function horizontalBarChartDirective($uibModal, $window, horizontalBarChartSvc,
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
            templateUrl: 'components/routes/views/sliderModal.html',
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
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.directive:overviewChart
  * @description
  * # overviewChart
  * Directive of the siuranaCharts
  */
  angular.module('siurana.charts')
  .directive('overviewChart', overviewChartDirective)

  overviewChartDirective.$inject = [
    '$uibModal',
    'overviewChartSvc',
    'utilsChartSvc'
  ]

  function overviewChartDirective($uibModal, overviewChartSvc, utilsChartSvc) {
    // Private 5 digit chart ID
    var ID = _.random(10000, 99999)

    return {
      scope: {
        routes: '='
      },
      restrict: 'E',
      template: '<div id="chart-' + ID + '"></div>',
      link: function(scope, element) {

        function initDirective() {
          scope.renderChart(scope.routes)
        }

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
            templateUrl: 'components/routes/views/sliderModal.html',
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

          var chart = scope.getCalendarHeatmap()
          .data(overviewChartSvc.processData(rawData))
          .cellSize(13)

          d3.select(element.find('#chart-' + ID)[0]).call(chart)
        }

        /**
        * Create and return a Calendar Heatmap chart
        * created using D3.js
        *
        * @return {Function} Callable object to create chart
        */
        scope.getCalendarHeatmap = function() {
          // Default values
          var data = []
          var cellSize = 13

          function my(container) {

            // Process data
            var day = d3.time.format("%w"),
            week = d3.time.format("%U"),
            format = d3.time.format("%m/%d/%Y")

            container.select("svg").remove()

            var endDate = new Date()
            var startDate = new Date(
              endDate.getFullYear() - 1,
              endDate.getMonth(),
              endDate.getDate() + 1
            )

            var width = 54 * cellSize + 10
            var height = cellSize * 8 + 10

            var svg = container.append("svg")
            .data([1])
            .attr("width", width)
            .attr("height", height)
            .attr("class", "RdYlGn")
            .append("g")

            svg.append("text")
            .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
            .style("text-anchor", "middle")
            .text(function(d) { return d; })

            // Route tip (on heatmap)
            var routeTip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              var metric = data[d].metrics[0]
              var html = ''
              html += '<span style="color:' + utilsChartSvc.typeColor(metric.type) + '">'
              html += metric.type + "</span> "
              html += metric.grade + ' ' + metric.status
              html +=" <span style='color:gray'>" + d + "</span>"
              return html
            })

            svg.call(routeTip)

            // legeng tip (climbing type)
            var legendTip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(type) {
              return '<span style="color:' + utilsChartSvc.typeColor(type) + '">' + type + '</span>'
            })

            svg.call(legendTip)

            var rect = svg.selectAll(".emptyDay")
            .data(function() { return d3.time.days(startDate, endDate) })
            .enter().append("rect")
            .attr("class", "emptyDay")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("x", function(d) {

              var dist = (endDate.getFullYear() === d.getFullYear()) ?
              1 + parseInt(week(endDate)) - parseInt(week(d)) :
              53 - parseInt(week(d)) + parseInt(week(endDate))

              return (53 - dist) * cellSize
            })
            .attr("y", function(d) { return day(d) * cellSize; })
            .datum(format)

            rect.filter(function(d) { return d in data; })
            .attr("class", "climbDay")
            .style('fill', function(d) {
              return utilsChartSvc.typeColor(data[d].metrics[0].type)
            })
            .style('cursor', 'pointer')
            .on('click', function(d) {
              scope.openSliderModal(_.pluck(data[d].metrics, 'id'))
            })
            .on("mouseover", function(d) {
              $(this).css({'opacity':0.8})
              routeTip.show(d)
            })
            .on("mouseout", function(d) {
              $(this).css({'opacity':1})
              routeTip.hide(d)
            })


            function applyStyle() {
              svg.selectAll('.emptyDay').style({
                'fill': '#fff',
                'stroke': '#ccc'
              })

              svg.selectAll('rect').style({
                'shape-rendering': 'crispEdges'
              })

              svg.selectAll('text').style({
                'font': '12px sans-serif',
                'fill': 'gray'
              })
            }

            function createLegend() {
              svg.append("text")
              .attr("transform", "translate(0," + (2 + cellSize * 8) + ")")
              .text('Summary of climbs over the last year')

              // Difficulty legend
              var xPos = 515
              svg.append("text")
              .attr("transform", "translate(" + xPos + "," + (2 + cellSize * 8) + ")")
              .text('Types of climbs')

              var legendDays = [
                'Sport lead',
                'Boulder',
                'Traditional',
                'Multi-pitch',
                'Top rope'
              ]
              svg.selectAll(".legendDay")
              .data(legendDays)
              .enter().append("rect")
              .attr("width", cellSize)
              .attr("height", cellSize)
              .attr("x", function(d) {
                var numRect = legendDays.indexOf(d)
                return xPos + 90 + cellSize * numRect + numRect * 2
              })
              .attr("y",  cellSize * 8 - 8)
              .style("fill", function(d) {
                return utilsChartSvc.typeColor(d)
              })
              .on("mouseover", function(d) {
                $(this).css({'opacity':0.8})
                legendTip.show(d)
              })
              .on("mouseout", function(d) {
                $(this).css({'opacity':1})
                legendTip.hide(d)
              })
            }

            createLegend()
            applyStyle()

          }

          my.data = function(value) {
            if (!arguments.length) {
              return data
            }
            data = value
            return my
          }

          my.cellSize = function(value) {
            if (!arguments.length) {
              return cellSize
            }
            cellSize = value || cellSize
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

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.directive:scatterPlotChart
  * @description
  * # scatterPlotChart
  * Directive of the siuranaCharts
  */
  angular.module('siurana.charts')
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
            templateUrl: 'components/routes/views/sliderModal.html',
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

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.directive:sectorsMetrics
  * @description
  * # sectorsMetrics
  */
  angular.module('siurana.charts')
  .directive('sectorsMetrics', sectorsMetricsDirective)

  sectorsMetricsDirective.$inject = []

  function sectorsMetricsDirective() {
    return {
      templateUrl: 'components/charts/views/_sectorsMetrics.html',
      restrict: 'E',
      scope: {
        metrics: '='
      },
      controller: function($scope, $uibModal) {
        /**
        * Open a modal to display routes details
        *
        * @method openRoutesModal
        * @param {Array} routes - routes of Id
        */
        $scope.openRoutesModal = function(routesId) {
          $uibModal.open({
            templateUrl: 'components/routes/views/sliderModal.html',
            controller: 'ModalsliderCtrl',
            size: 'md',
            resolve: {
              routesId: function() {
                return routesId
              }
            }
          })
        }
      }
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.directive:sliderCharts
  * @description
  * # sliderCharts
  */
  angular.module('siurana.charts')
  .directive('sliderCharts', sliderChartsDirective)

  sliderChartsDirective.$inject = [
    '$compile',
    '$rootScope',
    '$timeout'
  ]

  function sliderChartsDirective($compile, $rootScope, $timeout) {
    return {
      templateUrl: 'components/charts/views/_sliderCharts.html',
      restrict: 'E',
      scope: {
        routes: '='
      },
      link: function postLink(scope, element) {

        scope.slides = [
          {
            title: 'Sector quality',
            type: 'scatter-plot-chart',
            icon: 'fa-star-o'
          },
          {
            title: 'Climb quantity',
            type: 'vertical-bar-chart',
            icon: 'fa-bar-chart'
          },
          {
            title: 'Favorite climb type difficulty',
            type: 'horizontal-bar-chart',
            icon: 'fa-bar-chart'
          },
          {
            title: 'Climb diversity',
            type: 'treemap-chart',
            icon: 'fa-th-large'
          }
        ]

        /**
        * Dynamically compile chart into element
        *
        * @param {String} type
        */
        scope.renderChart = function() {
          var type = scope.currentSlideType
          scope.width = element.parent().width()
          var directive = '<' + type + ' routes="routes" width="width"></' + type + '>'
          element.find('.chart-' + type).empty().append(directive)

          $compile(element.find(type))(scope)
        }

        scope.currentSlideType = ''
        scope.$watch(function() {
          return _.find(scope.slides, function(slide) {
            return slide.active
          })
        }, function(currentSlide, previousSlide) {
          if (currentSlide !== previousSlide) {
            scope.currentSlideType = currentSlide.type
            $timeout(scope.renderChart, 10)
          }
        })
      }
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.directive:treemapChart
  * @description
  * # treemapChart
  */
  angular.module('siurana.charts')
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
            templateUrl: 'components/routes/views/sliderModal.html',
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

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.directive:verticalBarChart
  * @description
  * # verticalBarChart
  * Directive of the siuranaCharts
  */
  angular.module('siurana.charts')
  .directive('verticalBarChart', verticalBarChartDirective)

  verticalBarChartDirective.$inject = [
    '$uibModal',
    '$window',
    'verticalBarChartSvc',
    'utilsChartSvc'
  ]

  function verticalBarChartDirective($uibModal, $window, verticalBarChartSvc,
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
            templateUrl: 'components/routes/views/sliderModal.html',
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

          var chart = scope.getVerticalBar()
          .data(verticalBarChartSvc.processData(rawData))
          .width(scope.width || element.parent().width())
          .height(300)

          d3.select(element.find('#chart-' + ID)[0]).call(chart)
        }

        /**
        * Create and return a Vertical Bar chart
        * created using D3.js
        *
        * @return {Function} Callable object to create chart
        */
        scope.getVerticalBar = function() {
          var data = []
          var width = 800
          var height = 600

          function my(container) {


            var margin = {top: 20, right: 20, bottom: 55, left: 30},
            widthChart = width - margin.left - margin.right,
            heightChart = height - margin.top - margin.bottom

            var xScale = d3.scale.ordinal()
            .rangeRoundBands([0, widthChart], 0.1)

            var yScale = d3.scale.linear()
            .rangeRound([heightChart, 0])

            var formatMonth = function(value) {
              var month = []
              month[1] = "Jan"; month[2] = "Feb"
              month[3] = "Mar"; month[4] = "Apr"
              month[5] = "May"; month[6] = "Jun"
              month[7] = "Jul"; month[8] = "Aug"
              month[9] = "Sep"; month[10] = "Oct"
              month[11] = "Nov";month[12] = "Dec"

              return month[parseInt(value)]
            }

            var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")

            var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .tickFormat(d3.format("d"))

            //REMOVE SVG
            container.select("svg").remove()

            // CREATE NEW SVG
            var svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

            var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              var html = ''
              html += '<span style="color:' + utilsChartSvc.typeColor(d.name) + '">'
              html += d.name + "</span> "
              html += " : <span style='color:red'>" + d.sum + "</span>"
              return html
            })

            svg.call(tip)


            // Create Domains
            var maxRoutes = 0
            var i

            for (i = 0 ; i < data.length ; i++) {
              var month = data[i]

              var totalRoutes = 0
              for (var j = 0 ; j < month.type.length ; j++) {
                totalRoutes += month.type[j].sum
              }
              maxRoutes = Math.max(maxRoutes,totalRoutes)
            }

            var currentDate = new Date()
            var xDomain = []

            for (i = 0 ; i < 12 ; i++) {
              var string = String(currentDate.getMonth() + 1) + String(currentDate.getFullYear())
              string = currentDate.getMonth() < 9 ? '0' + string : string
              xDomain.push(string)
              currentDate.setMonth(currentDate.getMonth() - 1)
            }


            xScale.domain(xDomain.reverse())
            yScale.domain([0, maxRoutes])

            svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + heightChart + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")
            .text(function(d) {
              var month = d.substr(0,2)
              var year = d.substr(4,6)
              return formatMonth(month) + '-' + year
            })

            svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Climbs")

            var barsX = svg.selectAll(".date")
            .data(data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d) {
              return "translate(" + xScale(d.date) + ",0)"
            })

            barsX.selectAll("rect")
            .data(function(d) { return d.type })
            .enter().append("rect")
            .attr("width", xScale.rangeBand())
            .attr("y", function(d) { return yScale(d.y1); })
            .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1); })
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

            svg.selectAll('.axis line, .axis path')
            .style({
              'stroke': 'Black',
              'fill': 'none',
              'stroke-width': '1px',
              'shape-rendering':'crispEdges'
            })


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
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.service:horizontalBarChartSvc
  * @description
  * # horizontalBarChartSvc
  * Service of the siuranaCharts
  */
  angular.module('siurana.charts')
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

      _.forOwn(grades, function(routes, grade) {
        data.push({
          name: type,
          grade: grade,
          total: routes.length,
          routesId: _.pluck(routes, 'id')
        })
      })

      // Sort by grade
      data = data.sort(function(a,b) { return utilsChartSvc.compareRouteGrade(a.grade,b.grade) })

      return data
    }

    return HorizontalBarChart
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.service:overviewChartSvc
  * @description
  * # overviewChartSvc
  * Service of the siuranaCharts
  */
  angular.module('siurana.charts')
  .service('overviewChartSvc', overviewChartService)

  overviewChartService.$inject = [
    'utilsChartSvc'
  ]

  function overviewChartService(utilsChartSvc) {
    var OverviewChart = {}

    /**
    * Pre-process data to be rendered on a Calendar Heatmap
    *
    * @params {Array} Flat routes objects
    * @return {Array} Array indexed by dates
    */
    OverviewChart.processData = function(rawData) {
      var type
      var sortRouteGrade

      // Create hashmap of dates
      var dates = utilsChartSvc.arrayToHashtable(rawData,'date')

      // Calculate difficulty per climbing type (sorted hardest to easiest)
      var allTypes = utilsChartSvc.arrayToHashtable(rawData,'type')
      var difficulties = []
      sortRouteGrade = function(a, b) {
        return !utilsChartSvc.compareRouteGrade(a,b)
      }

      _.forOwn(allTypes, function(routes, type) {
        difficulties[type] = utilsChartSvc.arrayGroupBy(routes, 'grade')
        .sort(sortRouteGrade)
      })

      // Calculate metrics at dates for each climbing type
      var data = {}
      sortRouteGrade = function(a, b) {
        return !utilsChartSvc.compareRouteGrade(a.grade, b.grade)
      }

      _.forOwn(dates, function(routes, key) {
        var metrics = []
        var dayTypes = utilsChartSvc.arrayToHashtable(routes,'type')

        _.forOwn(dayTypes, function(typeRoutes, type) {
          typeRoutes.sort(sortRouteGrade)

          // Routes sorted hardest to easiest
          var hardestRoute = typeRoutes[0]

          var position = difficulties[hardestRoute.type].indexOf(hardestRoute.grade)
          var ease = Math.abs(parseFloat(position) / allTypes[type].length)

          if (!hardestRoute.grade) {
            hardestRoute.grade = ''
          }

          metrics.push({
            id: hardestRoute.id,
            type: hardestRoute.type,
            grade: hardestRoute.grade,
            status: hardestRoute.status,
            ease: ease,
            count: dayTypes[type].length
          })
        })

        metrics.sort(function(a,b) { return a.count < b.count; })

        data[key] = {
          date: key,
          total: dates[key].length,
          metrics: metrics
        }
      })

      return data
    }

    return OverviewChart
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.service:scatterPlotChartSvc
  * @description
  * # scatterPlotChartSvc
  * Service of the siuranaCharts
  */
  angular.module('siurana.charts')
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
      _.forOwn(sectors, function(sector, key) {
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
      })

      return data
    }

    return ScatterPlorChart
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.service:treemapChartSvc
  * @description
  * # treemapChartSvc
  * Service in the siuranaCharts.
  */
  angular.module('siurana.charts')
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

(function() {
  'use strict'

  /**
  * @module siuranaCharts
  * @name siuranaCharts.service:utilsChartSvc
  * @description
  * # utilsChartSvc
  * Service in the siuranaCharts
  */
  angular.module('siurana.charts')
  .service('utilsChartSvc', utilsChartService)

  utilsChartService.$inject = [
    'RoutesUtilsSvc'
  ]

  function utilsChartService(RoutesUtilsSvc) {
    var UtilsChart = {}

    /**
     * Create array of uniq strings sorted by frequency
     *
     * @method arrayGroupBy
     * @param {Array} array of objects
     * @param {String} property name
     *
     * @return {Array} Grouped array
     */
    UtilsChart.arrayGroupBy =function(data,field) {
      var seen = {}
      var frequency = {}

      return data
      .map(function(group) {
        if (group.hasOwnProperty(field)) {

          var value = group[field]
          if (!frequency.hasOwnProperty(value)) {
            frequency[value] = 0
          }
          frequency[value] += 1

          return value
        }
      })
      .sort(function(a,b) { return frequency[a] < frequency[b] })
      .filter(function(n) {
        return seen.hasOwnProperty(n) || n === undefined ? false : (seen[n] = true)
      })
    }

    /**
     * Return svg color based on Route type
     *
     * @method typeColor
     * @param {String} Route type
     *
     * @return {String} Svg color
     */
    UtilsChart.typeColor = function(type) {
      var route = {
        type: type
      }
      return RoutesUtilsSvc.getTypeColor(route)
    }


    /**
     * Create an array Hashtable of an object for a specific property name
     *
     * @method arrayToHashtable
     * @param {Array} array of objects
     * @param {String} property name
     *
     * @return {Array} Array indexed by property
     */
    UtilsChart.arrayToHashtable = function(data,field) {
      var hashtable = []

      for (var i=0 ; i < data.length ; i++) {
        var index = data[i][field]

        if (typeof hashtable[index] === 'undefined') {
          hashtable[index] = []
        }

        hashtable[index].push(data[i])
      }

      return hashtable
    }

    /**
     * Comapre grade between two routes
     *
     * @method compareRouteGrade
     * @param {String} grade a
     * @param {String} grade b
     *
     * @return {Boolean} TRUE if grade a greater than b
     */
    UtilsChart.compareRouteGrade = function(a,b) {
      // Compare route grade with digit & char
      var intA = parseInt(a.replace(/\D/g, ''))
      var intB = parseInt(b.replace(/\D/g, ''))
      var charA = a.replace(/[0-9]/g,'').toLowerCase()
      var charB = b.replace(/[0-9]/g,'').toLowerCase()

      return intA > intB || (intA === intB && charA > charB)
    }
    return UtilsChart
  }
// jscs:disable disallowSemicolons
})();

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

(function() {
  'use strict'

  /**
  * @module siuranaCore
  * @name siuranaCore.controller:navbarCtrl
  * @description
  * # navbarCtrl
  * Controller of the siuranaCore
  */
  angular.module('siurana.core')
  .controller('navbarCtrl', navbarController)

  navbarController.$inject = [
    '$scope',
    '$location',
    'Auth'
  ]

  function navbarController($scope, $location, Auth) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path()
    }

    $scope.isLoggedIn = Auth.isLoggedIn
  }
// jscs:disable disallowSemicolons
})();

// jscs:disable
(function() {
angular.module('siurana.core')

.constant('APP_CONFIG', {protocol:'https',dns:'test-climbing-memo.firebaseio.com',version:'v1',url:'https://test-climbing-memo.firebaseio.com/v1/'})

; })();
(function() {
  'use strict'

  /**
  * @module siuranaCore
  * @name siuranaCore.app:Run
  * @description
  * Run function to handle routes events
  */
  angular.module('siurana.core')
  .run(routesEventsRun)

  routesEventsRun.$inject = ['$rootScope', '$location', 'Auth']

  function routesEventsRun($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function(event) {
      if (!Auth.isLoggedIn() &&
          $location.url() !== '/') {
        event.preventDefault()
        $location.path('/')
      }
    })
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCore
  * @name siuranaCore.directive:mainNavbar
  * @description
  * # mainNavbar
  * Directive of the siuranaCore
  */
  angular.module('siurana.core')
  .directive('mainNavbar', mainNavbarDirective)

  mainNavbarDirective.$inject = []

  function mainNavbarDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'components/core/views/_mainNavbar.html',
      controller: 'navbarCtrl'
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCore
  * @name siuranaCore.filter:prettyUrl
  * @description
  * # prettyUrl
  * Filter in the siuranaCore
  */
  angular.module('siurana.core')
  .filter('prettyUrl', prettyUrlFilter)

  prettyUrlFilter.$inject = [
    'Utils'
  ]

  function prettyUrlFilter(Utils) {
    /**
    * Format url with hostname and pathname
    * @method prettyUrl
    * @throws {String} Not valid URL
    * @param {String} link
    * @param {String} maxChar
    * @returns {String}
    */
    return function(link, maxChar) {
      var url = Utils.parseHref(link)
      if (!url) {
        return _.trunc(link, maxChar)
      }

      maxChar = maxChar || Number.MAX_VALUE

      var prettyUrl = url.host + url.pathname + (url.search || '')
      prettyUrl = prettyUrl.replace(/^www\./, '')

      return _.trunc(prettyUrl, maxChar)
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCore
  * @name siuranaCore.service:Auth
  * @description
  * # Auth
  */
  angular.module('siurana.core')
  .service('Auth', authService)

  authService.$inject = [
    '$localStorage'
  ]

  function authService($localStorage) {
    var Auth = {}
    Auth.cachedSession = false

    /**
    * Authentication session
    * @typedef session
    * @type {object}
    * @property {string} uid
    * @property {string} token
    * @property {number} expires - UTC
    * @property {string} provider
    */

    /**
    * Create auth session in memory
    * @method createSession
    * @param {Object} session
    */
    Auth.createSession = function(session) {
      Auth.cachedSession = session
      $localStorage.mySession = session
    }

    /**
    * Delete current session
    * @method deleteSession
    */
    Auth.deleteSession = function() {
      Auth.cachedSession = false
      delete $localStorage.mySession
    }

    /**
    * Get current session
    * @method getSession
    * @return {session}
    */
    Auth.getSession = function() {
      if (!Auth.cachedSession) {
        Auth.cachedSession = $localStorage.mySession || {}
      }
      return Auth.cachedSession
    }

    /**
    * Returns true if user has a valid active session
    * @method isLoggedIn
    * @return {boolean}
    */
    Auth.isLoggedIn = function() {
      var session = Auth.getSession()
      var currentUTC = new Date().getTime() / 1000
      return session.token && session.expires > currentUTC
    }

    /**
     * Retrieve session token if exists
     * @method getToken
     * @return {String|Boolean} token
     */
    Auth.getToken = function() {
      if (Auth.isLoggedIn()) {
        return Auth.getSession().token
      }
      return false
    }

    return Auth
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCore
  * @name siuranaCore.service:authInterceptor
  * @description
  * # authInterceptor
  * Service in the siurana core module
  */
  angular.module('siurana.core')
  .service('authInterceptor', authInterceptorService)

  authInterceptorService.$inject = [
    '$q',
    '$location',
    'Auth',
    'APP_CONFIG'
  ]

  function authInterceptorService($q, $location, Auth, APP_CONFIG) {
    var authInterceptor = {}

    /**
    * Intercept http request and add auth token
    *
    * @param {Object} request
    * @returns {Object} request
    */
    authInterceptor.request = function(request) {
      if (request.url.indexOf(APP_CONFIG.url) === 0 &&
          Auth.getToken()) {
        var separator = request.url.indexOf('?') === -1 ? '?' : '&'
        request.url += separator + 'auth=' + Auth.getToken()
      }
      return request
    }

    /**
    * Intercept http error responses and handle unauthorized error code by
    * redirecting to the home page
    *
    * @param {Object} response
    * @returns {Object} response
    */
    authInterceptor.responseError = function(response) {
      if (response.status === 401 &&
          $location.url() !== '/') {
        $location.path('/')
      }
      return $q.reject(response)
    }

    return authInterceptor
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaCore
  * @name siuranaCore.service:Utils
  * @description
  * Javascript utils function
  */
  angular.module('siurana.core')
  .service('Utils', UtilsService)

  UtilsService.$inject = [
  ]

  function UtilsService() {
    var Utils = {}

    /**
    * URL object
    * @typedef url
    * @type {object}
    * @property {string} protocol
    * @property {string} host
    * @property {string} hostname
    * @property {string} port
    * @property {string} pathname
    * @property {string} search
    * @property {string} hash
    */

    /**
    * Extract url details from string
    * @method parseHref
    * @param {String} href
    * @return {url|Boolean} - False if error
    */
    Utils.parseHref = function(href) {
      if (!_.isString(href)) {
        return false
      }

      var match = href
      .match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/)
      return match && {
        protocol:  match[1],
        host:      match[2],
        hostname:  match[3],
        port:      match[4],
        pathname:  match[5],
        search:    match[6],
        hash:      match[7]
      }
    }

    return Utils
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaMap
  * @name siuranaMap.app:Config
  * @description
  * Application configuration
  */
  angular.module('siurana.map')
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    })
  })
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaMap
  * @name siuranaMap.controller:mapCtrl
  * @description
  * # mapCtrl
  * Controller of the siuranaMap
  */
  angular.module('siurana.map')
  .controller('mapCtrl', mapController)

  mapController.$inject = [
    '$log',
    '$rootScope',
    'mapChartSvc',
    'RoutesSvc',
    'ResolvedRoutes'
  ]

  function mapController($log, $rootScope, mapChartSvc,
  RoutesSvc, ResolvedRoutes) {
    /* jshint validthis:true */
    var vm = this

    /**
    * Initialize map controller
    *
    * @method initController
    * @param {Object} routes
    */
    vm.initController = function(routes) {
      vm.offline = !$rootScope.online

      var arrayRoutes = _.toArray(routes)
      var arrayLocations = mapChartSvc.processData(arrayRoutes)

      _.map(arrayLocations, function(site) {
        site.options = {
          icon: 'images/' + vm.getMarkerIcon(site.metrics[0].type)
        }
        return site
      })

      vm.locations = arrayLocations
      vm.map = {
        center: _.last(arrayLocations).coords,
        zoom: 8
      }
    }

    /**
    * Get marker icon based on route type
    *
    * @method getMarkerIcon
    * @param {String} type
    * @return {String}
    */
    vm.getMarkerIcon = function(type) {
      var markerIcon = ''

      switch (type) {
        case 'Sport lead':   markerIcon = 'climbing_yellow.png' ; break
        case 'Boulder':      markerIcon = 'climbing_blue.png'   ; break
        case 'Traditional':  markerIcon = 'climbing_green.png'  ; break
        case 'Multi-pitch':  markerIcon = 'climbing_orange.png' ; break
        case 'Top rope':     markerIcon = 'climbing_gray.png'   ; break
        default:             markerIcon = 'climbing_gray.png'   ; break
      }
      return markerIcon
    }

    vm.initController(ResolvedRoutes)
    RoutesSvc.subscribeForUpdates(vm.initController)
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaMap
  * @name siuranaMap.service:mapChartSvc
  * @description
  * # mapChartSvc
  * Service in the siuranaMap
  */
  angular.module('siurana.map')
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
              return result += n.rating || 0
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

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.controller:ModaladdrouteCtrl
  * @description
  * # ModaladdrouteCtrl
  * Controller of the siuranaRoutes
  */
  angular.module('siurana.routes')
  .controller('ModaladdrouteCtrl', modalAddRouteController)

  modalAddRouteController.$inject = [
    '$uibModalInstance',
    '$scope',
    '$log',
    'routeNoteFormattingFilter',
    'RoutesSvc'
  ]

  function modalAddRouteController($uibModalInstance, $scope, $log,
  routeNoteFormattingFilter, RoutesSvc)  {
    /**
    * Close the modal
    *
    * @method cancelEdit
    */
    $scope.cancelEdit = function() {
      $scope.route.$editMode = false
      $uibModalInstance.dismiss('cancel')
    }

    /**
    * Flip the card by simulating mouse hover
    *
    * @method flipCard
    */
    $scope.flipCard = function() {
      $scope.route.$hover = !$scope.route.$hover
    }

    /**
    * Save route - it will calculate the lat long
    *
    * @method saveRoute
    */
    $scope.saveRoute = function() {
      $scope.route.$editMode = false
      RoutesSvc.saveRoute($scope.route)

      $scope.cancelEdit()
    }

    $scope.initController = function() {
      var route = {}
      route.notes = routeNoteFormattingFilter()
      route.$date = new Date()
      route.$editMode = true
      route.status = 'Attempt'

      $scope.route = route
    }

    $scope.initController()
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.controller:ModalsliderCtrl
  * @description
  * # ModalsliderCtrl
  * Controller of the siuranaRoutes
  */
  angular.module('siurana.routes')
  .controller('ModalsliderCtrl', modalSliderController)

  modalSliderController.$inject = [
    '$scope',
    '$uibModalInstance',
    '$localStorage',
    '$log',
    '$rootScope',
    '$filter',
    'routesId',
    'routeNoteFormattingFilter',
    'RoutesSvc'
  ]

  function modalSliderController($scope, $uibModalInstance, $localStorage, $log,
  $rootScope, $filter, routesId, routeNoteFormattingFilter, RoutesSvc) {

    /**
    * Close the modal
    *
    * @method closeModal
    */
    $scope.closeModal = function() {
      $uibModalInstance.dismiss('cancel')
    }

    // Get Data
    RoutesSvc.getRoutes().then(function(data) {
      $scope.initController(data)
    })

    /**
    * Create slider based on routesId
    *
    * @method initController
    * @param {Array} routes
    */
    $scope.initController = function(routes) {
      var displayedRoutes = _.map(routesId, function(id) {
        return _.find(routes, function(route) {
          return route.id === id
        })
      })

      $scope.myInterval = 0
      $scope.noWrapSlides = false
      $scope.slides = _.map(displayedRoutes, function(route) {
        route.notes = routeNoteFormattingFilter(route.notes)
        return {
          content: route
        }
      })
    }

    $scope.editRoute = function(route) {
      route.$copy = _.clone(route)
      route.$date = new Date(route.date)
      route.$editMode = true
    }

    $scope.deleteRoute = function(route) {
      route.$editMode = false
      RoutesSvc.deleteRoute(route)

      $scope.closeModal()
    }

    $scope.saveRoute = function(route) {
      route.$editMode = false
      RoutesSvc.saveRoute(route)
    }

    $scope.cancelEdit = function(route) {
      route = _.merge(route, route.$copy)
      route.$editMode = false
      delete route.$copy
    }

    /**
    * Flip the active slide
    *
    * @method flipCard
    */
    $scope.flipCard = function() {
      var activeSlide = _.first($scope.slides.filter(function(slide) {
        return slide.active
      }))
      activeSlide.$hover = !activeSlide.$hover
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.directive:cardRoute
  */
  angular.module('siurana.routes')
  .directive('cardRoute', cardRouteDirective)

    cardRouteDirective.$inject = [
    ]

    function cardRouteDirective() {
      return {
        restrict: 'E',
        templateUrl: 'components/routes/views/_cardRoute.html',
        link: function(scope) {
          scope.tabs = [
            {
              icon: 'sticky-note',
              text: 'Notes',
              type: 'notes'
            },
            {
              icon: 'camera',
              text: 'Media',
              type: 'media'
            },
            {
              icon: 'calendar',
              text: 'Ascents',
              type: 'ascents'
            },
            {
              icon: 'cubes',
              text: 'Builder',
              type: 'builder'
            }
          ]
        }
      }
    }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.directive:routeAscents
  * @description
  * Angular directive which represent summary of a
  * route display on a card
  */
  angular.module('siurana.routes')
  .directive('routeAscents', routeAscentsDirective)

    routeAscentsDirective.$inject = [
    ]

    function routeAscentsDirective() {
      return {
        restrict: 'E',
        scope: {
          route: '='
        },
        templateUrl: 'components/routes/views/_routeAscents.html'
      }
    }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.directive:routeBuilder
  * @description
  * Angular directive which represent summary of a
  * route display on a card
  */
  angular.module('siurana.routes')
  .directive('routeBuilder', routeBuilderDirective)

    routeBuilderDirective.$inject = [
    ]

    function routeBuilderDirective() {
      return {
        restrict: 'E',
        scope: {
          route: '='
        },
        templateUrl: 'components/routes/views/_routeBuilder.html'
      }
    }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.directive:routeLocation
  * @description
  * # mainNavbar
  * Angular form validation for route location
  */
  angular.module('siurana.routes')
  .directive('routeLocation', function($q, $http) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        /**
        * Returns a promise that reject if Google can't fint it
        * @method validateName
        * @param {String} location
        * @return {Object} - promise
        */
        scope.validateLocation = function(location) {
          var deferred = $q.defer()
          var googleBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

          if (ctrl.$isEmpty(location)) {
            return $q.when()
          }

          $http.get(googleBaseUrl + encodeURIComponent(location))
          .then(function(result) {
            if (result.data.status !== 'ZERO_RESULTS') {
              deferred.resolve()
            } else {
              deferred.reject()
            }
          }).catch(function() {
            deferred.resolve()
          })

          return deferred.promise
        }

        ctrl.$asyncValidators.routeLocation = scope.validateLocation
      }
    }
  })
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.directive:routeMedia
  * @description
  * Angular directive which represent summary of a
  * route display on a card
  */
  angular.module('siurana.routes')
  .directive('routeMedia', routeMediaDirective)

  routeMediaDirective.$inject = [
    '$window',
    'RoutesUtilsSvc'
  ]

  function routeMediaDirective($window, RoutesUtilsSvc) {
    return {
      restrict: 'E',
      scope: {
        route: '='
      },
      templateUrl: 'components/routes/views/_routeMedia.html',
      link: function(scope) {
        scope.getMedia = RoutesUtilsSvc.getRouteMedia
        scope.isValidMedia = RoutesUtilsSvc.isValidRouteMedia
        scope.openMedia = function(media) {
          $window.open(media.link, '_blank')
        }

        scope.deleteMedia = function(link) {
          scope.route.medias = _.filter(scope.route.medias, function(mediaLink) {
            return mediaLink !== link
          })
          scope.medias = _.filter(scope.medias, function(media) {
            return media.link !== link
          })
        }

        scope.route = scope.route || {}
        scope.route.medias = scope.route.medias || []
        scope.medias = _.map(scope.route.medias, RoutesUtilsSvc.getRouteMedia)

        scope.getMedia = RoutesUtilsSvc.getRouteMedia
        scope.newMedias = ['']
        scope.$watch('newMedias', function(newMedias) {
          var validNewMedias = _.filter(newMedias, RoutesUtilsSvc.isValidRouteMedia)
          // Remove all pushed media to route
          scope.route.medias = _.pluck(scope.medias, 'link')
          // Add new media to routes
          scope.route.medias = _.union(validNewMedias, scope.route.medias)

          if (newMedias.length === validNewMedias.length) {
            scope.newMedias.push('')
          }
        }, true)

      }
    }
  }
  // jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.directive:routeNotes
  * @description
  * Angular directive which represent summary of a
  * route display on a card
  */
  angular.module('siurana.routes')
  .directive('routeNotes', routeNotesDirective)

    routeNotesDirective.$inject = [
    ]

    function routeNotesDirective() {
      return {
        restrict: 'E',
        scope: {
          route: '='
        },
        templateUrl: 'components/routes/views/_routeNotes.html'
      }
    }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.directive:routeSummary
  * @description
  * Angular directive which represent summary of a
  * route display on a card
  */
  angular.module('siurana.routes')
  .directive('routeSummary', routeSummaryDirective)

    routeSummaryDirective.$inject = [
      'RoutesUtilsSvc',
      'RoutesSvc',
      'utilsChartSvc'
    ]

    function routeSummaryDirective(RoutesUtilsSvc, RoutesSvc, utilsChartSvc) {
      return {
        restrict: 'E',
        scope: {
          route: '='
        },
        templateUrl: 'components/routes/views/_routeSummary.html',
        link: function(scope) {
          scope.getIconStatus  = RoutesUtilsSvc.getIconStatus
          scope.getIconRock    = RoutesUtilsSvc.getIconRock
          scope.getIndoorLabel = RoutesUtilsSvc.getIndoorLabel
          scope.getTypeColor   = RoutesUtilsSvc.getTypeColor

          /**
          * Create an array of size N
          *
          * @method getTimes
          * @param {Integer} n
          * @return {Array}
          */
          scope.getTimes = function(n) {
            return new Array(n || 0)
          }

          /**
          * Populate smart default values when a sector is selected
          *
          * @method sectorPopulatePlaceholder
          */
          scope.sectorPopulatePlaceholder = function() {
            var filteredArrayRoutes = scope.arrayRoutes.filter(function(n) {
              return n.sector === scope.route.sector
            })

            var properties = ['type','rock','location']

            for (var i=0 ; i < properties.length ; i++) {
              var property = properties[i]
              if (!scope.route.hasOwnProperty(property)) {
                scope.route[property] = utilsChartSvc.arrayGroupBy(filteredArrayRoutes,property)[0]
              }
            }
          }

          // Buffer for all routes
          scope.arrayRoutes = []

          RoutesSvc.getRoutes().then(function(data) {
            scope.arrayRoutes    = _.toArray(data)
            scope.locations = utilsChartSvc.arrayGroupBy(scope.arrayRoutes, 'location')
            scope.sectors = utilsChartSvc.arrayGroupBy(scope.arrayRoutes, 'sector')
          })

        }
      }
    }
    // jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.filter:routeNoteFormatting
  * @description
  * # routeNoteFormatting
  * Filter in the siuranaRoutes.
  */
  angular.module('siurana.routes')
  .filter('routeNoteFormatting', routeNoteFormattingFilter)

  routeNoteFormattingFilter.$inject = []

  function routeNoteFormattingFilter() {
    /**
    * Add placeholder description
    * @method routeNoteFormatting
    * @param {String} input
    * @returns {String}
    * @example
    * var routeName = ''
    * var output = routeNoteFormatting(routeName)
    * // output contains: ```\nReminder\n``` [...]
    */
    return function(input) {
      return input ? input : '**Notes:**\n\n---\n'
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.app:Config
  * @description
  * Module configuration
  */
  angular.module('siurana.routes')
  .constant('DATABASE_URL', 'https://climbing-memo.firebaseio.com/')

// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.service:RoutesSvc
  * @description
  * # Routes service architecture interface:
  * ```sh
  *                               +---------------------+
  *                               | RoutesCache service |
  *                               +---------------------+
  * +--------------+              |  Caching Interface  |
  * | Directive A  +--+           |  Handle events      |
  * +--------------+  |           +---------^-----------+
  *                   |                     |
  * +--------------+  |          +----------+-----------+
  * | Directive B  +--+          |                      |
  * +--------------+  |  +-------+--------+   +---------+----------+
  *                   |  | Routes service +---> RoutesSync service |
  * +--------------+  |  +----------------+   +--------------------+
  * | Directive N  +--+--> Main Interface |   |  Handle offline    |
  * +--------------+  |  | Notifications  |   |  Handle sync       |
  *                   |  +----------------+   +---------+----------+
  * +--------------+  |                                 |
  * | Controller A +--+                    +------------v----------+
  * +--------------+  |                    | RoutesPersist service |
  *                   |                    +-----------------------+
  * +--------------+  |                    |  Store on Firebase    |
  * | ...          +--+                    |  Clean sproperties    |
  * +--------------+                       +-----------------------+
  * ```
  */
  angular.module('siurana.routes')
  .service('RoutesSvc', RoutesService)

  RoutesService.$inject = [
    '$q',
    'notificationService',
    'RoutesSyncSvc',
    'RoutesCache'
  ]

  /**
  * Routes update event callback definition
  * @callback routesUpdate
  * @param {Array} routes
  */
  function RoutesService($q, notificationService, RoutesSyncSvc, RoutesCache) {
    var Routes = {}

    /**
     * @method subscribeForUpdates
     * @param {routesUpdate} - Callback
     * @description Map to RoutesCache service
     */
    Routes.subscribeForUpdates = RoutesCache.addListener

    Routes.getRoutes = function() {
      return RoutesSyncSvc.getRoutes()
    }

    Routes.saveRoute = function(route) {
      var deferred = $q.defer()

      RoutesSyncSvc.saveRoute(route).then(function(route) {
        notificationService.success(route.name + ' saved')
        deferred.resolve(route)
      }).catch(function(eventName) {
        notificationService.info('Offline mode: "' + eventName +
        '" event saved')
        deferred.reject(false)
      })

      return deferred.promise
    }

    Routes.deleteRoute = function(route) {
      var deferred = $q.defer()

      RoutesSyncSvc.deleteRoute(route).then(function(route) {
        notificationService.success(route.name + ' deleted')
        deferred.resolve(route)
      }).catch(function() {
        notificationService.info('Offline mode: "delete" event saved')
        deferred.reject(false)
      })

      return deferred.promise
    }

    return Routes
  }

// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.service:RoutesCache
  * @description
  * # RoutesCache
  * Service in the siuranaRoutes
  * @TODO Handle localStorage logic in this service
  */
  angular.module('siurana.routes')
  .service('RoutesCache', RoutesCacheService)

  RoutesCacheService.$inject = [
  ]

  /**
  * Routes update event callback definition
  * @callback routesUpdate
  * @param {Array} routes
  */
  function RoutesCacheService() {
    var RoutesCache = {}

    /**
    * @type {Object} routes
    * @private
    */
    RoutesCache.data = null

    /**
    * @type {Array} Callback
    * @private
    */
    RoutesCache.listeners = []

    /**
    * @method getData
    * @description Get cached routes
    */
    RoutesCache.getData = function() {
      return RoutesCache.data
    }

    /**
    * @method publishUpdate
    * @description
    * Call all listener with current cached data
    */
    RoutesCache.publishUpdate = function() {
      _.forEach(RoutesCache.listeners, function(listener) {
        listener(RoutesCache.data)
      })
    }

    /**
    * @method setData
    * @param {Object} data
    * @param {String} index - Object property
    * @description
    * Set cached variable and call all listeners with updated data
    */
    RoutesCache.setData = function(data, index) {
      if (index) {
        RoutesCache.data = RoutesCache.data || {}
        RoutesCache.data[index] = data
      } else {
        RoutesCache.data = data
      }

      RoutesCache.publishUpdate()
    }

    /**
    * @method removeData
    * @param {String} index - Object property
    * @description
    * Remove at given index call all listeners with updated data
    */
    RoutesCache.removeData = function(index) {
      if (RoutesCache.data) {
        delete RoutesCache.data[index]
        RoutesCache.publishUpdate()
      }
    }

    /**
    * @method addListener
    * @param {routesUpdate} - Callback
    * @description Function to call when `data` is being updated
    */
    RoutesCache.addListener = function(callback) {
      RoutesCache.listeners.push(callback)
    }

    return RoutesCache
  }

// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.service:RoutesPersistSvc
  * @description
  * Service of the siuranaRoutes
  */
  angular.module('siurana.routes')
  .service('RoutesPersistSvc', RoutesPersistSvc)

  RoutesPersistSvc.$inject = [
    '$http',
    'Auth',
    'APP_CONFIG'
  ]

  function RoutesPersistSvc($http, Auth, APP_CONFIG) {
    var RoutesPersist = {}

    /**
    * Dynamically generate database URL and save bucket name
    * Use session uid
    *
    * @TODO add http interceptors
    * @param {String} uri
    * @return {String} url
    */
    RoutesPersist.getUrl = function(uri) {
      var session = Auth.getSession()
      return APP_CONFIG.url +
        'users/' + session.uid +
        '/routes/' + uri
    }

    /**
    * Remove properties starting with "$" sign
    *
    * @param {Object} object
    * @return {Object}
    */
    RoutesPersist.cleanObjectProperties = function(object) {
      var cleanedObject = JSON.parse(JSON.stringify(object)) // Clone

      _.keys(cleanedObject)
      .filter(function(key) { return key.match(/^\$/) })
      .forEach(function(key) { delete cleanedObject[key] })

      return cleanedObject
    }

    /**
     * Request a route from database
     *
     * @param {String} id
     * @return {Object} promise
     */
    RoutesPersist.getRoute = function(id) {
      return $http.get(RoutesPersist.getUrl(id + '.json'))
    }

    /**
    * Request all routes from database
    *
    * @return {Object} promise
    */
    RoutesPersist.getRoutes = function() {
      return $http.get(RoutesPersist.getUrl('.json'))
    }

    /**
    * Add a route to the database
    *
    * @param {Object} route
    * @return {Object} promise
    */
    RoutesPersist.addRoute = function(route) {
      var cleanedRoute = RoutesPersist.cleanObjectProperties(route)

      return $http.post(RoutesPersist.getUrl('.json'), cleanedRoute)
    }

    /**
    * Delete a route from database
    *
    * @param {Object} route
    * @return {Object} promise
    */
    RoutesPersist.deleteRoute = function(id) {
      return $http.delete(RoutesPersist.getUrl(id + '.json'))
    }

    /**
    * Request all routes from database
    *
    * @return {Object} promise
    */
    RoutesPersist.updateRoute = function(route, id) {
      var cleanedRoute = RoutesPersist.cleanObjectProperties(route)

      return $http.patch(RoutesPersist.getUrl(id + '.json'), cleanedRoute)
    }

    return RoutesPersist
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.service:RoutesSyncSvc
  * @description
  * Service in the siuranaRoutes
 s */
  angular.module('siurana.routes')
  .service('RoutesSyncSvc', RoutesSyncService)

  RoutesSyncService.$inject = [
    '$filter',
    '$http',
    '$q',
    '$localStorage',
    '$rootScope',
    '$timeout',
    '$log',
    'RoutesPersistSvc',
    'RoutesCache'
  ]

  function RoutesSyncService($filter, $http, $q, $localStorage, $rootScope,
  $timeout, $log, RoutesPersistSvc, RoutesCache) {
    var RoutesSync = {}

    /**
    * Get routes - from firebase or localStorage
    *
    * @method getRoutes
    * @param {Boolean} forceRefresh
    * @return {Object} - Promise
    */
    RoutesSync.getRoutes = function(forceRefresh) {
      var deferred = $q.defer()

      if (RoutesCache.getData() && !forceRefresh) { // Use Cache
        deferred.resolve(RoutesCache.getData())
      } else { // Query network
        RoutesPersistSvc.getRoutes().then(function(result) {
          RoutesSync.syncRoutes()

          var data = result.data || {}
          $localStorage.routes = data
          RoutesCache.setData(data)
          deferred.resolve(data)
        })
        .catch(function() {
          if (forceRefresh) {
            $log.log('Offline mode: can\'t refresh routes')
          }
          // Use LocalStorage
          $log.log('Local Storage used - routes')
          RoutesCache.setData($localStorage.routes)
          deferred.resolve($localStorage.routes || [])

          if (_.find($localStorage.routes, function(localRoute) {
            return angular.isDefined(localRoute.$sync)
          })) {
            RoutesSync.createTimeout()
          }
        })
      }

      return deferred.promise
    }

    /**
    * Persist new route and handle if sourceRoute is a copy
    *
    * @method createRoute
    * @private
    * @param {Object} route - copy
    * @param {Object} deferred - parent promise to resolve
    */
    RoutesSync.createRoute = function(route, deferred) {
      RoutesPersistSvc.addRoute(route)
      .then(function(result) {
        route.id = result.data.name
        RoutesPersistSvc.updateRoute(route, route.id)

        RoutesCache.setData(
          RoutesPersistSvc.cleanObjectProperties(route),
          route.id)
        deferred.resolve(route)
      })
      .catch(function() {
        RoutesSync.createRouteSync('create', route)
        deferred.reject('create')
      })
    }

    /**
    * Persist existing route
    *
    * @method updateRoute
    * @private
    * @param {Object} route
    * @param {Object} deferred - parent promise to resolve
    */
    RoutesSync.updateRoute = function(route, deferred) {
      RoutesPersistSvc.updateRoute(route, route.id)
      .then(function() {
        RoutesCache.setData(
          RoutesPersistSvc.cleanObjectProperties(route),
          route.id)
        deferred.resolve(route)
      })
      .catch(function() {
        RoutesSync.createRouteSync('update', route)
        deferred.reject('update')
      })
    }

    /**
    * Save route - it will calculate the lat long
    *
    * @method saveRoute
    * @param {Object} route
    * @return {Object} promise - resolve as id or false
    */
    RoutesSync.saveRoute = function(sourceRoute) {
      var deferred = $q.defer()

      var route = JSON.parse(JSON.stringify(sourceRoute)) // Clone
      route.date = $filter('date')(route.$date,'MM/dd/yyyy')

      var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

      $http.get(baseUrl + encodeURIComponent(route.location))
      .then(function(result) {
        var data = result.data
        if (data.status !== 'ZERO_RESULTS') {
          route.latitude = data.results[0].geometry.location.lat
          route.longitude = data.results[0].geometry.location.lng
        }

        if (route.id) { // Update route
          RoutesSync.updateRoute(route, deferred)
        } else { // Create new route
          RoutesSync.createRoute(route, deferred)
        }
      })
      .catch(function() {
        var routeEvent = route.id ? 'update' : 'create'
        RoutesSync.createRouteSync(routeEvent, route)
        deferred.reject(routeEvent)
      })

      return deferred.promise
    }

    /**
    * Delete a route
    *
    * @method deleteRoute
    * @param {Object} route
    * @return {Object} promise - route id or false
    */
    RoutesSync.deleteRoute = function(route) {
      var deferred = $q.defer()

      RoutesPersistSvc.deleteRoute(route.id)
      .then(function() {
        RoutesCache.removeData(route.id)
        deferred.resolve(route)
      })
      .catch(function() {
        RoutesSync.createRouteSync('delete', route)
        deferred.reject(false)
      })

      return deferred.promise
    }

    //  ____             _                 ____
    // |  _ \ ___  _   _| |_ ___          / ___| _   _ _ __   ___
    // | |_) / _ \| | | | __/ _ \  _____  \___ \| | | | '_ \ / __|
    // |  _ < (_) | |_| | ||  __/ |_____|  ___) | |_| | | | | (__
    // |_| \_\___/ \__,_|\__\___|         |____/ \__, |_| |_|\___|
    //                                           |___/

    var intervalDelay = 30000 // 30 sec
    var canCreateTimeout = true

    /**
    * Create route sync property in localStorage
    *
    * @method createRouteSync
    * @param {String} event
    * @param {Object} route
    */
    RoutesSync.createRouteSync = function(event, route) {
      var localRouteFound = false

      $localStorage.routes = _.map($localStorage.routes, function(localRoute) {
        if (route.id === localRoute.id) { // Update route
          localRouteFound = true
          localRoute.$sync = event
          RoutesSync.createTimeout()
        }
        return localRoute
      })
      if (!localRouteFound && event !== 'delete') { // Create route
        route.$sync = event
        route.id = "tmp_" + _.random(10000, 99999)
        $localStorage.routes.push(route)
        RoutesCache.setData(route, route.id)
        RoutesSync.createTimeout()
      }
    }

    /**
    * Sync routes to database if needed
    *
    * @method syncRoutes
    */
    RoutesSync.syncRoutes = function() {
      if ($rootScope.online) { // Try to sync
        canCreateTimeout = true
        _.each($localStorage.routes, function(route) {
          switch (route.$sync) {
            case 'create':
            case 'update':
              var savedRouteId = route.id
              if (route.id && route.id.match(/^tmp/g)) {
                route.id = false
              }

              RoutesSync.saveRoute(route).then(function(routeId) {
                intervalDelay = 30000 // 30 sec
                delete route.$sync
              }).catch(function() {
                route.id = savedRouteId
              })

              break
            case 'delete':
              RoutesSync.deleteRoute(route).then(function(routeId) {
                intervalDelay = 30000 // 30 sec
                delete route.$sync
              })
              break
          }
        })
      } else if (_.find($localStorage.routes, function(localRoute) {
          return angular.isDefined(localRoute.$sync) })) {
          RoutesSync.createTimeout()
      }
    }

    /**
    * Create route timeout at incremental interval delay
    *
    * @method createTimeout
    */
    RoutesSync.createTimeout = function() {
      if (canCreateTimeout) {
        canCreateTimeout = false
        $timeout(RoutesSync.syncRoutes, intervalDelay)
        intervalDelay *= 2
      }
    }

    return RoutesSync
  }

// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaRoutes
  * @name siuranaRoutes.service:RoutesUtilsSvc
  * @description
  * Service in the siuranaRoutes
  */
  angular.module('siurana.routes')
  .service('RoutesUtilsSvc', RoutesUtilsService)

  RoutesUtilsService.$inject = [
    'Utils'
  ]

  /**
   * @typedef Media
   * @type {Object}
   * @property {String} provider
   * @property {String} color
   * @property {String} link
   * @property {String} header
   */
  function RoutesUtilsService(Utils) {
    var RoutesUtils = {}

    /**
    * Get icon based on route status
    *
    * @method getIconStatus
    * @param {Object} route
    * @return {String}
    */
    RoutesUtils.getIconStatus = function(route) {
      if (!(route && route.status)) {
        return 'fa-connectdevelop'
      }
      return route.status === 'Attempt' ? 'fa-square-o' : 'fa-check-square-o'
    }

    /**
    * Get icon based on route rock
    *
    * @method getIconRock
    * @param {Object} route
    * @return {String}
    */
    RoutesUtils.getIconRock = function(route) {
      if (!(route && route.rock)) {
        return 'fa-connectdevelop'
      }
      return route.rock === 'Indoor' ? 'fa-home' : 'fa-sun-o'
    }

    /**
    * Get Indoor label based on route rock
    *
    * @method getIndoorLabel
    * @param {Object} route
    * @return {String}
    */
    RoutesUtils.getIndoorLabel = function(route) {
      return route.rock === 'Indoor' ? 'Indoor' : 'Outdoor'
    }

    /**
    * Get route color based on type
    *
    * @method getTypeColor
    * @param {Object} Route
    *
    * @return {String} Css color
    */
    RoutesUtils.getTypeColor = function(route) {
      switch (route.type) {
        case 'Sport lead':	return 'gold'
        case 'Boulder':		return 'lightskyblue'
        case 'Traditional':	return 'yellowgreen'
        case 'Multi-pitch':	return 'darkorange'
        case 'Top rope':	return 'lightgray'
        default:			return 'lightgray'
      }
    }

    /**
    * Create route media object from a url
    *
    * @method getRouteMedia
    * @param {String} link
    *
    * @return {Media} media
    */
    RoutesUtils.getRouteMedia = function(link) {
      var media = {
        provider:  'question-circle',
        color:     'text-muted',
        link:      link
      }

      var url = Utils.parseHref(link)
      if (!url) {
        return media
      }

      var hostname = url.hostname

      if (_.contains(hostname, 'youtube')) {
        media.provider = 'youtube'
        media.color    = 'text-danger'
        media.header   = 'Youtube video'
      } else if (_.contains(hostname, 'instagram')) {
        media.provider = 'instagram'
        media.color    = 'text-primary'
        media.header   = 'Instagram photo'
      } else if (_.contains(hostname, 'vimeo')) {
        media.provider = 'vimeo'
        media.color    = 'text-success'
        media.header   = 'Vimeo video'
      } else if (_.contains(hostname, 'flickr')) {
        media.provider = 'flickr'
        media.color    = ''
        media.header   = 'Flickr photos'
      }
      return media
    }

    /**
    * Validate a route media link
    *
    * @method isValidRouteMedia
    * @param {String} link
    * @return {Boolean}
    */
    RoutesUtils.isValidRouteMedia = function(link) {
      return RoutesUtils.getRouteMedia(link).provider !== 'question-circle'
    }

    return RoutesUtils
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaTable
  * @name siuranaTable.directive:routesTable
  * @description
  * # routesTable
  */
  angular.module('siurana.table')
  .directive('routesTable', routesTableDirective)

  routesTableDirective.$inject = [
  ]

  function routesTableDirective() {
    return {
      templateUrl: 'components/table/views/_routesTable.html',
      restrict: 'E'
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaTable
  * @name siuranaTable.controller:tableCtrl
  * @description
  * # tableCtrl
  * Controller of the siuranaTable
  */
  angular.module('siurana.table')
  .controller('tableCtrl', tableController)

  tableController.$inject = [
    '$uibModal',
    'utilsChartSvc',
    'RoutesSvc',
    'DTOptionsBuilder',
    'RoutesUtilsSvc',
    'ResolvedRoutes'
  ]

  function tableController($uibModal, utilsChartSvc, RoutesSvc,
  DTOptionsBuilder, RoutesUtilsSvc, ResolvedRoutes) {
    /* jshint validthis:true */
    var vm = this

    vm.dtInstance = {}
    vm.dtOptions = DTOptionsBuilder
      .newOptions()
      .withBootstrap()
      .withOption('sDom', "<'no-row'" +
        "<'col-xs-4 hidden-xs'l><'col-xs-8'f>r>" + // Header
        "t" + // Table
        "<'no-row'<'col-xs-4 hidden-xs'i><'pull-righ'p>>" // Footer
      )
      .withOption('oLanguage', {
        'sLengthMenu': '<i class="fa hidden-xs fa-eye"></i> _MENU_',
        'sSearch': '<i class="fa hidden-xs fa-search"></i>',
        'sSearchPlaceholder': 'Filter routes',
        // 'sInfo': 'Total <b>_TOTAL_</b> routes',
        // 'sInfoEmpty': 'Total <b>_TOTAL_</b> routes',
        'sEmptyTable': 'No climbing routes found',
        'oPaginate': {
          'sNext': '<i class="fa fa-angle-right"></i>',
          'sPrevious': '<i class="fa fa-angle-left"></i>'
        }
      })
      .withOption('pageLength', 6)
      .withOption('lengthMenu', [6, 10, 25, 50, 100])

    /**
    * Render next page of datatable
    *
    * @method nextPage
    */
    vm.nextPage = function() {
      var dtApi = $(vm.dtInstance.dataTable[0]).dataTable().api() // jshint ignore:line
      dtApi.page('next').draw('page')
    }

    /**
    * Render previous page of datatable
    *
    * @method previousPage
    */
    vm.previousPage = function() {
      var dtApi = $(vm.dtInstance.dataTable[0]).dataTable().api() // jshint ignore:line
      dtApi.page('previous').draw('page')
    }


    /**
    * Initialize controller with data
    *
    * @method initController
    * @param {Object} Routes
    */
    vm.initController = function(data) {
      var count = 0
      _.map(data, function(route, key) {
        route.$date    = route.date
        route.$id      = key
        count++
      })
      vm.routes = _.toArray(data)

      var arrayLocations = utilsChartSvc.arrayGroupBy(vm.routes,"location")
      var arraySectors   = utilsChartSvc.arrayGroupBy(vm.routes,"sector")

      vm.locations = arrayLocations
      vm.sectors   = arraySectors
    }

    vm.getTypeColor = RoutesUtilsSvc.getTypeColor
    vm.getIconStatus = RoutesUtilsSvc.getIconStatus

    /**
    * Create a route object in the scope using default values
    *
    * @method addRoute
    */
    vm.addRoute = function() {
      $uibModal.open({
        templateUrl: 'components/routes/views/_modalAddRoute.html',
        controller: 'ModaladdrouteCtrl',
        size: 'md'
      })
    }

    /**
    * Open a modal to display route details
    *
    * @method openRouteModal
    */
    vm.openRouteModal = function(route) {
      $uibModal.open({
        templateUrl: 'components/routes/views/sliderModal.html',
        controller: 'ModalsliderCtrl',
        size: 'md',
        resolve: {
          routesId: function() {
            return [route.id]
          }
        }
      })
    }

    vm.initController(ResolvedRoutes)
    RoutesSvc.subscribeForUpdates(vm.initController)
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaTimeline
  * @name siuranaTimeline.directive:routesTimeline
  * @description
  * # routesTimeline
  */
  angular.module('siurana.timeline')
  .directive('routesTimeline', routesTimelineDirective)

  routesTimelineDirective.$inject = [
  ]

  function routesTimelineDirective() {
    return {
      templateUrl: 'components/timeline/views/_routesTimeline.html',
      restrict: 'E',
      replace: true
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaTimeline
  * @name siuranaTimeline.controller:TimelineCtrl
  * @description
  * # TimelineCtrl
  * Controller of the siuranaTimeline
  */
  angular.module('siurana.timeline')
  .controller('TimelineCtrl', timelineController)

  timelineController.$inject = [
    '$log',
    '$uibModal',
    'timelineSvc',
    'RoutesSvc',
    'RoutesUtilsSvc',
    'ResolvedRoutes'
  ]

  function timelineController($log, $uibModal,timelineSvc,
  RoutesSvc, RoutesUtilsSvc, ResolvedRoutes) {
    /* jshint validthis:true */
    var vm = this

    /**
    * Get route color based on type
    *
    * @method getTypeColor
    * @param {Object} Route
    *
    * @return {String} Css color
    */
    vm.getTypeColor = function(event) {
      return RoutesUtilsSvc.getTypeColor({type: event.mainType})
    }

    vm.getIconStatus = RoutesUtilsSvc.getIconStatus

    /**
    * Get tooltip text based on rock type
    *
    * @method getBadgeTooltip
    * @param {Boolean} event
    * @return {String}
    */
    vm.getBadgeTooltip = function(event) {
      return (event.isIndoor ? 'Indoor' : 'Outdoor') + ' ' + event.mainType
    }

    /**
    * Get icon based on rock type
    *
    * @method getBadgeIcon
    * @param {Boolean} event
    * @return {String}
    */
    vm.getBadgeIcon = function(event) {
      return 'fa ' + (event.isIndoor ? 'fa-home' : 'fa-sun-o')
    }

    /**
    * Open a modal to display routes details
    *
    * @method openRouteModal
    * @param {Object} route - First route to display
    * @param {Array} routes - All routes in slider
    */
    vm.openRouteModal = function(route, routes) {
      $uibModal.open({
        templateUrl: 'components/routes/views/sliderModal.html',
        controller: 'ModalsliderCtrl',
        size: 'md',
        resolve: {
          routesId: function() {
            var routesId = _.pluck(routes, 'id')
            var routeIndex = _.indexOf(routesId, route.id)
            return _.slice(routesId, routeIndex, routesId.length).concat(
              _.slice(routesId, 0, routeIndex)
            )
          }
        }
      })
    }

    /**
    * Open a modal to add a route
    *
    * @method addRoute
    */
    vm.addRoute = function() {
      $uibModal.open({
        templateUrl: 'components/routes/views/_modalAddRoute.html',
        controller: 'ModaladdrouteCtrl',
        size: 'md'
      })
    }

    // Init Controller
    vm.initController = function(data) {
      var arrayRoutes = _.toArray(data)
      var events = timelineSvc.processData(arrayRoutes)

      vm.events = events
    }

    vm.initController(ResolvedRoutes)
    RoutesSvc.subscribeForUpdates(vm.initController)
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaTimeline
  * @name siuranaTimeline.service:timelineSvc
  * @description
  * # timeline
  * Service in the siuranaTimeline.
  */
  angular.module('siurana.timeline')
  .service('timelineSvc', timelineService)

  timelineService.$inject = [
    'utilsChartSvc'
  ]

  function timelineService(utilsChartSvc) {
    var Timeline = {}

    /**
    * Pre-process data to be rendered on a timeline
    * @params {Array} Flat routes objects
    * @return {Object} Tree of properties
    */
    Timeline.processData = function(rawData) {
      // Sort by date
      var routes = rawData.sort(function(a,b) {
        return moment(b.date, 'MM-DD-YYYY').unix() -  moment(a.date, 'MM-DD-YYYY').unix()
      })

      // Group by Locations
      var currentLocation
      var locations = _.reduce(routes, function(result, route) {
        route.location = route.location || 'unknow'

        if (currentLocation !== route.location) {
          result.push({
            areaLocation: route.location,
            routes: []
          })
          currentLocation = route.location
        }
        var currentRoutes = _.last(result).routes
        currentRoutes.push(route)
        return result
      }, [])

      // Group by sectors and sort
      locations = _.map(locations, function(areaLocation) {
        areaLocation.sectors = _.map(utilsChartSvc.arrayGroupBy(areaLocation.routes, 'sector'),
        function(sector) {
          return areaLocation.routes.filter(function(route) {
            return route.sector === sector
          }).sort(function(routeA, routeB) {
            return utilsChartSvc.compareRouteGrade(routeB.grade, routeA.grade)
          })
        })
        return areaLocation
      })

      // Calculate first/last date per locations
      locations = _.map(locations, function(areaLocation) {
        areaLocation.end = _.first(areaLocation.routes).date
        areaLocation.start   = _.last(areaLocation.routes).date
        return areaLocation
      })

      // Generate output data
      var data = _.map(locations, function(areaLocation) {
        var routeTypes = utilsChartSvc.arrayGroupBy(areaLocation.routes, 'type')
        var routeRocks = utilsChartSvc.arrayGroupBy(areaLocation.routes, 'rock')
        delete areaLocation.routes
        return {
          mainType: _.first(routeTypes),
          isIndoor: _.first(routeRocks) === 'Indoor',
          content: areaLocation
        }
      })

      return data
    }

    return Timeline
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaUsers
  * @name siuranaUsers.directive:profileSummary
  * @description
  * # profileSummary
  * Directive of the siuranaUsers
  */
  angular.module('siurana.users')
  .directive('profileSummary', profileSummaryDirective)

  profileSummaryDirective.$inject = [
    '$rootScope',
    'UsersSvc',
    'Auth'
  ]

  function profileSummaryDirective($rootScope, UsersSvc, Auth) {
    return {
      restrict: 'E',
      templateUrl: 'components/users/views/_profileSummary.html',
      link: function(scope) {
        scope.initDirective = function() {
          var uid = Auth.getSession().uid || 'none'
          scope.profile = { name: 'Climbing Memo' }
          UsersSvc.getProfile(uid).then(function(result) {
            scope.profile = result.data
          })
        }

        scope.initDirective()
      }
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaUsers
  * @name siuranaUsers.directive:userLogin
  * @description
  * # userLogin
  * Directive of the siuranaUsers
  */
  angular.module('siurana.users')
  .directive('userLogin', userLoginDirective)

  userLoginDirective.$inject = [
    'UserLoginSvc',
    'notificationService',
    'Auth'
  ]

  function userLoginDirective(UserLoginSvc,
  notificationService, Auth) {
    return {
      restrict: 'E',
      templateUrl: 'components/users/views/_userLogin.html',
      link: function(scope) {
        scope.signIn = function(provider) {
          switch (provider) {
            case 'google':
              UserLoginSvc.googleSignIn()
              .then(function(profile) {
                scope.initDirective()
                notificationService.success('Welcome ' + profile.name)
              }).catch(function() {
                notificationService.error('Authentication failed')
              })
              break
          }
        }

        scope.logOut = UserLoginSvc.logOut

        scope.initDirective = function() {
          scope.isLoggedIn = Auth.isLoggedIn
          scope.name = Auth.getSession().name
        }

        scope.initDirective()
      }
    }
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaUsers
  * @name siuranaUsers.service:UserLoginSvc
  * @description
  * # UserLoginSvc
  */
  angular.module('siurana.users')
  .service('UserLoginSvc', userLoginService)

  userLoginService.$inject = [
    '$log',
    '$q',
    '$location',
    'UsersSvc',
    'Auth',
    'APP_CONFIG'
  ]

  function userLoginService($log, $q, $location, UsersSvc, Auth,
  APP_CONFIG) {
    var UserLogin = {}
    UserLogin.firebase = new Firebase(APP_CONFIG.url)

    /**
     * Handle successful login from provider
     * @method successLogin
     * @param {Object} session
     * @param {Object} profile
     * @private
     */
    UserLogin.successLogin = function(session, profile) {
      Auth.createSession(session)
      UsersSvc.updateProfile(session.uid, profile)
      $location.path('/timeline')
    }

    /**
    * Remove local session, invalidate the token and redirect to home page
    *
    * @method logOut
    */
    UserLogin.logOut = function() {
      Auth.deleteSession()
      UserLogin.firebase.unauth()
      $location.path('/')
    }

    /**
    * Handle OAuth callback for any provider
    *
    * @method oauthSuccessCallback
    * @private
    * @param {Object} error
    * @param {Object} data
    * @param {Object} deferred
    */
    UserLogin.oauthSuccessCallback = function(error, data, deferred) {
      if (error) {
        $log.debug('Google authentication failed')
        deferred.reject(error)
      } else {
        var provider = data.provider
        var session = {
          uid:       data.uid,
          token:     data.token,
          expires:   data.expires,
          provider:  data.provider,
          name:      data[provider].displayName
        }
        var profile = {
          uid:       data.uid,
          provider:  data.provider,
          id:        data[provider].id,
          email:     data[provider].email,
          name:      data[provider].displayName,
          picture:   data[provider].profileImageURL,
          link:      data[provider].cachedUserProfile.link,
          locale:    data[provider].cachedUserProfile.locale
        }

        Firebase.goOffline()
        deferred.resolve(profile)
        UserLogin.successLogin(session, profile)
      }
    }

    /**
    * Prompt the user to login and then invoke the google login popup
    *
    * @return {Object} promise that resolve to profile info
    */
    UserLogin.googleSignIn = function() {
      var deferred = $q.defer()

      UserLogin.firebase.authWithOAuthPopup('google', function(error, data) {
        UserLogin.oauthSuccessCallback(error, data, deferred)
      }, { scope: 'email' })

      return deferred.promise
    }

    return UserLogin
  }
// jscs:disable disallowSemicolons
})();

(function() {
  'use strict'

  /**
  * @module siuranaUsers
  * @name siuranaUsers.service:UsersSvc
  * @description
  * # UsersSvc
  * Service of the siuranaUsers
  */
  angular.module('siurana.users')
  .service('UsersSvc', usersService)

  usersService.$inject = [
    '$http',
    'APP_CONFIG'
  ]

  function usersService($http, APP_CONFIG) {
    var Users = {}

    /**
    * Dynamically generate database URL
    *
    * @TODO add http interceptors
    * @param {String} uri
    * @return {String} url
    */
    Users.getUrl = function(uri) {
      return APP_CONFIG.url + 'users/' + uri
    }

    /**
    * Request a profile form database
    *
    * @param {String} uid
    * @return {Object} promise
    */
    Users.getProfile = function(uid) {
      return $http({
        method: 'GET',
        url: Users.getUrl(uid + '/profile.json'),
        cache: true
      })
    }

    /**
    * Create or Update a user profile to the database
    *
    * @param {String} uid
    * @param {Object} profile
    * @return {Object} promise
    */
    Users.updateProfile = function(uid, profile) {
      return $http.put(Users.getUrl(uid + '/profile.json'), profile)
    }

    return Users
  }
// jscs:disable disallowSemicolons
})();

(function() {angular.module("siurana",["siurana.table", "siurana.timeline", "siurana.map", "siurana.charts"]).run(['$templateCache', function($templateCache) {  'use strict';

  $templateCache.put('components/charts/views/_gridCharts.html',
    "<div class=\"row\"> <div class=\"col-md-6\"> <!-- Panel Scatter plot --> <div class=\"panel panel-success\"> <div class=\"panel-heading\"> <h3 class=\"panel-title\"><span class=\"fa fa-star-o\"></span> Sector quality</h3> </div> <div class=\"panel-body\"> <scatter-plot-chart routes=\"routes\"></scatter-plot-chart> </div> </div> </div> <div class=\"col-md-6\"> <!-- Panel Vertical Chart --> <div class=\"panel panel-success\"> <div class=\"panel-heading\"> <h3 class=\"panel-title\"><span class=\"fa fa-bar-chart\"></span> Climb quantity</h3> </div> <div class=\"panel-body\"> <vertical-bar-chart routes=\"routes\"></vertical-bar-chart> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-6\"> <!-- Panel Horizontal Chart --> <div class=\"panel panel-success\"> <div class=\"panel-heading\"> <h3 class=\"panel-title\"><span class=\"fa fa-bar-chart\"></span> Favorite climb type difficulty</h3> </div> <div class=\"panel-body\"> <horizontal-bar-chart routes=\"routes\"></horizontal-bar-chart> </div> </div> </div> <div class=\"col-md-6\"> <!-- Panel Treemap Chart --> <div class=\"panel panel-success\"> <div class=\"panel-heading\"> <h3 class=\"panel-title\"><span class=\"fa fa-th-large\"></span> Climb diversity</h3> </div> <div class=\"panel-body\"> <treemap-chart routes=\"routes\"></treemap-chart> </div> </div> </div> </div>"
  );


  $templateCache.put('components/charts/views/_headerOverview.html',
    "<div class=\"panel panel-info overview\"> <div class=\"panel-heading\"> <h3 class=\"panel-title\"><span class=\"fa fa-calendar\"></span> Overview</h3> </div> <div class=\"panel-body\"> <overview-chart class=\"text-center\" routes=\"routes\"></overview-chart> <hr> <div class=\"metrics\"> <table class=\"table table-bordered\"> <tbody> <tr class=\"active\"> <td class=\"text-center\" style=\"width:33%\"> <small class=\"text-muted\">Number of Climbs</small><br> <b>{{metrics.count}} Total</b> </td> <td class=\"text-center\" style=\"width:33%\"> <small class=\"text-muted\">Favorite climbing type</small><br> <b>{{metrics.favoriteType}}</b> </td> <td class=\"text-center\" style=\"width:33%\"> <small class=\"text-muted\">Favorite climbing sector</small><br> <b>{{metrics.favoriteSector}}</b> </td> </tr> </tbody> </table> </div> </div> </div>"
  );


  $templateCache.put('components/charts/views/_sectorsMetrics.html',
    "<span ng-repeat=\"metric in metrics\"> <i class=\"fa fa-map-o\"></i> {{metric.rating}} <i class=\"fa fa-star\"></i> <a style=\"cursor:pointer\" title=\"Routes Details\" ng-click=\"openRoutesModal(metric.routesId)\"> {{metric.sector}} </a> <span class=\"badge\">{{metric.count}}</span><br> </span>"
  );


  $templateCache.put('components/charts/views/_sliderCharts.html',
    "<div class=\"slider-unstyled slider-charts\"> <uib-carousel> <uib-slide ng-repeat=\"slide in slides\" active=\"slide.active\"> <div class=\"panel panel-default panel-unstyled\"> <div class=\"panel-heading\"> <h3 class=\"panel-title\"><span class=\"fa {{slide.icon}}\"></span> {{slide.title}}</h3> </div> <div class=\"panel-body\"> <div class=\"chart-{{slide.type}}\"></div> </div> </div> </uib-slide> </uib-carousel> </div>"
  );


  $templateCache.put('components/core/views/_mainNavbar.html',
    "<nav class=\"navbar navbar-default\"> <div class=\"container\"> <div class=\"navbar-header\"> <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-responsive-collapse\"> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> </button> <a class=\"navbar-brand\" href=\"#/\"><i class=\"fa fa-book\"></i> Memo App</a> </div> <div class=\"navbar-collapse collapse navbar-responsive-collapse\"> <ul class=\"nav navbar-nav\"> <li ng-class=\"{ active: isActive('/timeline')}\" ng-if=\"isLoggedIn()\"> <a href=\"#/timeline\" data-toggle=\"collapse\" data-target=\".navbar-responsive-collapse.in\"> <i class=\"fa fa fa-clock-o\"></i> Timeline </a> </li> <li ng-class=\"{ active: isActive('/table')}\" ng-if=\"isLoggedIn()\"> <a href=\"#/table\" data-toggle=\"collapse\" data-target=\".navbar-responsive-collapse.in\"> <i class=\"fa fa-table\"></i> Table </a> </li> <li ng-class=\"{ active: isActive('/map')}\" ng-if=\"isLoggedIn()\"> <a href=\"#/map\" data-toggle=\"collapse\" data-target=\".navbar-responsive-collapse.in\"> <i class=\"fa fa-globe\"></i> Map </a> </li> <li ng-class=\"{ active: isActive('/charts')}\" ng-if=\"isLoggedIn()\"> <a href=\"#/charts\" data-toggle=\"collapse\" data-target=\".navbar-responsive-collapse.in\"> <i class=\"fa fa-bar-chart\"></i> Charts </a> </li> </ul> <div class=\"navbar-right\"> <user-login></user-login> </div> </div> </div> </nav>"
  );


  $templateCache.put('components/map/views/_windowLocationMap.html',
    "<div class=\"gm-pro-popup windowLocationMap\"> <h4><i class=\"fa fa-map-marker\"></i> {{parameter.name}}</h4> <sectors-metrics metrics=\"parameter.metrics\"></sectors-metrics> <br> <a href=\"https://www.google.com/maps/dir/Current+Location/{{ parameter.coords.latitude }}, {{ parameter.coords.longitude }}\" target=\"_blank\"> <i class=\"fa fa-car\"></i> Get directions </a> </div>"
  );


  $templateCache.put('components/routes/views/_cardRoute.html',
    "<div class=\"card-header\"> <div class=\"text-center actions\"> <button uib-tooltip=\"Edit\" ng-if=\"!route.$editMode\" ng-click=\"editRoute(route)\" tooltip-placement=\"bottom\" class=\"btn btn-default\" tooltip-animation=\"false\"> <i class=\"fa fa-pencil text-info fa-lg\"></i> </button> <button uib-tooltip=\"Delete\" ng-if=\"!route.$editMode\" ng-click=\"deleteRoute(route)\" tooltip-placement=\"bottom\" class=\"btn btn-default\" tooltip-animation=\"false\"> <i class=\"fa fa-trash text-danger fa-lg\"></i> </button> <button uib-tooltip=\"Save\" ng-if=\"route.$editMode\" class=\"btn btn-default\" ng-click=\"saveRoute(route)\" tooltip-placement=\"bottom\" tooltip-animation=\"false\"> <i class=\"fa fa-check text-success fa-lg\"></i> </button> <button uib-tooltip=\"Cancel\" ng-if=\"route.$editMode\" class=\"btn btn-default\" ng-click=\"cancelEdit(route)\" tooltip-placement=\"bottom\" tooltip-animation=\"false\"> <i class=\"fa fa-times text-danger fa-lg\"></i> </button> </div> </div> <div class=\"card card-route\"> <div class=\"front\"> <div class=\"content\"> <div class=\"main\"> <route-summary route=\"route\"></route-summary> </div> </div> </div> <!-- end front panel --> <div class=\"back\"> <div class=\"content\"> <div class=\"main\"> <uib-tabset justified=\"true\"> <uib-tab ng-repeat=\"tab in tabs\" vertical=\"true\"> <uib-tab-heading> <i class=\"fa fa-{{tab.icon}}\"></i> <span class=\"hidden-xs\">{{tab.text}}</span> </uib-tab-heading> <div class=\"panel panel-default\"> <div class=\"panel-body\"> <div ng-switch=\"tab.type\"> <route-notes route=\"route\" ng-switch-when=\"notes\"></route-notes> <route-media route=\"route\" ng-switch-when=\"media\"></route-media> <route-ascents route=\"route\" ng-switch-when=\"ascents\"></route-ascents> <route-builder route=\"route\" ng-switch-when=\"builder\"></route-builder> </div> </div> </div> </uib-tab> </uib-tabset> </div> </div> </div> <!-- end back panel --> </div> <!-- end card -->"
  );


  $templateCache.put('components/routes/views/_markdownReference.html',
    "<h2>Headers</h2> <pre><code># Level one header #</code></pre> <pre><code>### Level three header ###</code></pre> <p>Headers continue as you&#8217;d imagine, with extra hashes.</p> <h2>Links</h2> <div class=\"row\"> <div class=\"col-md-6\"> <pre><code>[This is a link](http://cmizony.com)</code></pre> </div> <div class=\"col-md-6\"> <p><a href=\"http://cmizony.com\">This is a link</a></p> </div> </div> <h2>Blockquote</h2> <div class=\"row\"> <div class=\"col-md-6\"> <pre><code>&gt; This is quoted\n" +
    "</code></pre> </div> <div class=\"col-md-6\"> <blockquote> <p>This is quoted</p> </blockquote> </div> </div> <h2>Code</h2> <div class=\"row\"> <div class=\"col-md-6\"> <pre><code>Inline code is `escaped` with backticks</code></pre> </div> <div class=\"col-md-6\"> <p>Inline code is <code>escaped</code> with backticks</p> </div> </div> <h2>BlockCode</h2> <div class=\"row\"> <div class=\"col-md-6\"> <pre><code>```\n" +
    "Blockcode is inside three backticks\n" +
    "```</code></pre> </div> <div class=\"col-md-6\"> <pre>Blockcode in inside three backticks</pre> </div> </div> <h2>Lists</h2> <div class=\"row\"> <div class=\"col-md-6\"> <pre><code>* This\n" +
    "* is\n" +
    "* a list</code></pre> </div> <div class=\"col-md-6\"> <ul> <li>This</li> <li>is</li> <li>a list</li> </ul> </div> </div> <div class=\"row\"> <div class=\"col-md-6\"> <pre><code>1. with\n" +
    "1. numbers</code></pre> </div> <div class=\"col-md-6\"> <ol> <li>with</li> <li>numbers</li> </ol> </div> </div> <h2>Horizontal lines</h2> <div class=\"row\"> <div class=\"col-md-6\"> <p>Three or more dashes</p> <pre><code>---- </code></pre> </div> <div class=\"col-md-6\"> <hr> </div> </div> <h2>Emphasis</h2> <div class=\"row\"> <div class=\"col-md-6\"> <pre><code>_italic_ or *italic*</code></pre> </div> <div class=\"col-md-6\"> <p><em>italic</em> or <em>italic</em></p> </div> </div> <div class=\"row\"> <div class=\"col-md-6\"> <pre><code>__bold__ or **bold**</code></pre> </div> <div class=\"col-md-6\"> <p><strong>bold</strong> or <strong>bold</strong></p> </div> </div> <h2>Escaping</h2> <div class=\"row\"> <div class=\"col-md-6\"> <pre><code>This is \\*\\*not\\*\\* in bold.</code></pre> </div> <div class=\"col-md-6\"> <p>This is &#42;&#42;not&#42;&#42; in bold.</p> </div> </div> <h2>More markdown</h2> <p>See full <a href=\"http://daringfireball.net/projects/markdown/syntax\" target=\"_blank\" class=\"external\">Markdown syntax</a></p>"
  );


  $templateCache.put('components/routes/views/_markdownReferenceSummary.html',
    "<pre>\n" +
    "  <code># Level one header #</code>\n" +
    "  <code>### Level three header ###</code>\n" +
    "  <code>[This is a link](http://cmizony.com)</code>\n" +
    "  <code>![alt description](http://cmizony.com/img/technologies/d3js.png)</code>\n" +
    "  <code>&gt; This is quoted\n" +
    "  </code>\n" +
    "  <code>Inline code is `escaped` with backticks</code>\n" +
    "  <code>```\n" +
    "  Blockcode is inside three backticks\n" +
    "  ```</code>\n" +
    "  <code>* This\n" +
    "  * is\n" +
    "  * a list</code>\n" +
    "  <code>1. with\n" +
    "  1. numbers</code>\n" +
    "  <code>---- </code>\n" +
    "  <code>_italic_ or *italic*</code>\n" +
    "  <code>__bold__ or **bold**</code>\n" +
    "  <code>This is \\*\\*not\\*\\* in bold.</code>\n" +
    "</pre> <p>See full <a href=\"http://daringfireball.net/projects/markdown/syntax\" target=\"_blank\" class=\"external\">Markdown syntax</a></p>"
  );


  $templateCache.put('components/routes/views/_modalAddRoute.html',
    "<div class=\"route-modal\"> <div class=\"modal-body\"> <div> <div class=\"card-container manual-flip\" ng-class=\"{hover: route.$hover}\"> <card-route></card-route> </div> <div class=\"modal-footer\"> <button class=\"btn btn-success\" ng-click=\"flipCard()\"><i class=\"fa fa-undo fa-flip-vertical\"></i> Flip</button> <button class=\"btn btn-primary\" ng-click=\"cancelEdit()\"><i class=\"fa fa-times\"></i></button> </div> </div> </div> </div>"
  );


  $templateCache.put('components/routes/views/_routeAscents.html',
    "<div class=\"alert alert-dismissible alert-info\"> Ascents routes not yet implemented </div>"
  );


  $templateCache.put('components/routes/views/_routeBuilder.html',
    "<div class=\"alert alert-dismissible alert-info\"> Routes builder not yet implemented </div>"
  );


  $templateCache.put('components/routes/views/_routeMedia.html',
    "<div class=\"text-left\"> <div ng-if=\"!route.$editMode\"> <div ng-if=\"medias.length === 0\"> <div class=\"panel-body\"> <div class=\"row\"> <div class=\"col-xs-3\"> <span class=\"fa-stack fa-2x text-muted\"> <i class=\"fa fa-circle fa-stack-2x\"></i> <i class=\"fa fa-camera fa-stack-1x fa-inverse\"></i> </span> </div> <div class=\"col-xs-9\"> <b>No medias</b> <i class=\"fa fa-lg fa-youtube text-danger\" uib-tooltip=\"Youtube\"></i>&nbsp; <i class=\"fa fa-lg fa-instagram text-primary\" uib-tooltip=\"Instagram\"></i>&nbsp; <i class=\"fa fa-lg fa-vimeo text-success\" uib-tooltip=\"Vimeo\"></i>&nbsp; <i class=\"fa fa-lg fa-flickr\" uib-tooltip=\"Flickr\"></i> <p style=\"margin-top:7px\" class=\"text-muted\"> Edit route to add external links </p> </div> </div> </div> </div> <div ng-repeat=\"media in medias\" class=\"route-media panel panel-default\"> <div ng-if=\"isValidMedia(media.link)\" class=\"panel-body\" ng-click=\"openMedia(media)\"> <div class=\"row\"> <div class=\"col-xs-3\"> <i class=\"fa fa-3x fa-fw fa-{{media.provider}} {{media.color}}\"></i> </div> <div class=\"col-xs-9\"> <b>{{media.header}}</b> <p class=\"visible-xs text-muted\">{{media.link | prettyUrl:20}}</p> <p class=\"hidden-xs text-muted\">{{media.link | prettyUrl:50}}</p> </div> </div> </div> </div> </div> <div ng-if=\"route.$editMode\"> <div ng-repeat=\"link in newMedias track by $index\" class=\"route-media-edit panel panel-default\"> <div class=\"panel-body\"> <div class=\"row\"> <div class=\"col-xs-3\"> <i class=\"fa fa-3x fa-fw fa-{{getMedia(link).provider}} {{getMedia(link).color}}\"></i> </div> <div class=\"col-xs-9\"> <div class=\"input-group\" ng-if=\"!getMedia(link).header\"> <div class=\"input-group-addon\"> <i class=\"fa fa-lg fa-plus\" uib-tooltip=\"Accepted sites\"></i> </div> <i class=\"fa fa-lg fa-youtube text-danger\" uib-tooltip=\"Youtube\"></i>&nbsp; <i class=\"fa fa-lg fa-instagram text-primary\" uib-tooltip=\"Instagram\"></i>&nbsp; <i class=\"fa fa-lg fa-vimeo text-success\" uib-tooltip=\"Vimeo\"></i>&nbsp; <i class=\"fa fa-lg fa-flickr\" uib-tooltip=\"Flickr\"></i> </div> <b>{{getMedia(link).header}}</b> <div class=\"input-group\"> <div class=\"input-group-addon\"> <i class=\"fa fa-globe\"></i> </div> <input type=\"url\" ng-model=\"newMedias[$index]\" class=\"form-control\" placeholder=\"URL\"> </div> </div> </div> </div> </div> <div ng-repeat=\"media in medias\" class=\"route-media-edit panel panel-default\"> <div ng-if=\"isValidMedia(media.link)\" class=\"panel-body\"> <div class=\"row\"> <div class=\"col-xs-3\"> <button uib-tooltip=\"Delete media link\" ng-click=\"deleteMedia(media.link)\" tooltip-placement=\"bottom\" class=\"btn btn-default ng-scope\" tooltip-animation=\"false\"> <i class=\"fa fa-trash text-danger fa-2x\"></i> </button> </div> <div class=\"col-xs-9\"> <i class=\"fa fa-lg fa-fw fa-{{media.provider}} {{media.color}}\"></i> <b>{{media.header}}</b> <p class=\"visible-xs text-muted\">{{media.link | prettyUrl:20}}</p> <p class=\"hidden-xs text-muted\">{{media.link | prettyUrl:50}}</p> </div> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('components/routes/views/_routeNotes.html',
    "<div ng-if=\"!route.$editMode\"> <div marked=\"route.notes\"></div> </div> <div ng-if=\"route.$editMode\"> <uib-tabset type=\"pills\"> <uib-tab> <uib-tab-heading> <span style=\"cursor:pointer\"><i class=\"fa fa-pencil-square-o\"></i> <span class=\"hidden-xs\">Markdown</span></span> </uib-tab-heading> <textarea rows=\"12\" ng-trim=\"false\" maxlength=\"2000\" class=\"form-control\" ng-model=\"route.notes\"></textarea> <span class=\"text-muted\" ng-show=\"route.notes.length > 1000\"> <i class=\"fa fa-pencil\"></i> {{2001 - route.notes.length - route.notes.split(\"\\n\").length}} characters left </span> </uib-tab> <uib-tab> <uib-tab-heading> <span style=\"cursor:pointer\"><i class=\"fa fa-search\"></i> <span class=\"hidden-xs\">Preview</span></span> </uib-tab-heading> <div marked=\"route.notes\"></div> </uib-tab> <uib-tab> <uib-tab-heading> <span style=\"cursor:pointer\"><i class=\"fa fa-question-circle\"></i> <span class=\"hidden-xs\">Help</span></span> </uib-tab-heading> <div class=\"hidden-xs hidden-sm\" ng-include src=\"'components/routes/views/_markdownReference.html'\"></div> <div class=\"visible-xs visible-sm\" ng-include src=\"'components/routes/views/_markdownReferenceSummary.html'\"></div> </uib-tab> </uib-tabset> </div>"
  );


  $templateCache.put('components/routes/views/_routeSummary.html',
    "<div ng-if=\"!route.$editMode\"> <span class=\"fa-stack fa-3x\" uib-tooltip=\"{{getIndoorLabel(route)}} {{route.type}}\" tooltip-placement=\"bottom\"> <i class=\"fa fa-circle fa-stack-2x\" style=\"color:{{getTypeColor(route)}}\"></i> <i class=\"fa {{getIconRock(route)}} fa-stack-1x fa-inverse\"></i> </span> <h3 class=\"name\"> {{ route.name }} <i ng-if=\"route.$sync\" class=\"fa fa-refresh text-info\" uib-tooltip=\"Offline {{route.$sync}}\"></i> </h3> <div class=\"header\"> <span>- {{ route.grade }} -</span> <div class=\"rating\"> <span ng-repeat=\"t in getTimes(route.rating) track by $index\"> <i class=\"fa fa-star\"></i> </span> <span class=\"hidden-xs\" ng-repeat=\"t in getTimes(5 - route.rating) track by $index\"> <i class=\"fa fa-star-o\"></i> </span> </div> </div> <h5><i class=\"fa fa-map-marker fa-fw text-muted\"></i> {{route.location}}</h5> <h5><i class=\"fa fa-map-o fa-fw text-muted\"></i> {{route.sector}}</h5> <h5><i class=\"fa fa-calendar-o fa-fw text-muted\"></i> {{route.date}}</h5> <h5><i class=\"fa {{getIconRock(route)}} fa-fw text-muted\"></i> {{route.rock}} </h5> <h5><i class=\"fa {{getIconStatus(route)}} fa-fw text-muted\"></i> {{route.status}} </h5> </div> <div ng-if=\"route.$editMode\"> <form name=\"form\" novalidate> <span class=\"fa-stack fa-3x\"> <i class=\"fa fa-circle fa-stack-2x\" style=\"color:{{getTypeColor(route)}}\"></i> <i class=\"fa {{getIconRock(route)}} fa-stack-1x fa-inverse\"></i> </span> <div class=\"input-group\"> <div class=\"input-group-addon\"> <i class=\"fa fa-fw\" uib-tooltip=\"{{ form.name.$error.required ?  'Name is required' : '' }}\" ng-class=\"{\n" +
    "            'fa-pencil'           : !form.name.$pending,\n" +
    "            'fa-spinner fa-pulse' : form.name.$pending,\n" +
    "            'text-muted'          : form.name.$pristine,\n" +
    "            'text-success'        : form.name.$valid && form.name.$dirty,\n" +
    "            'text-danger'         : form.name.$invalid && form.name.$dirty,\n" +
    "          }\"></i> </div> <input name=\"name\" autocomplete=\"off\" placeholder=\"Name\" class=\"form-control\" type=\"required\" required ng-model=\"route.name\"> </div> <div class=\"input-group\"> <div class=\"input-group-addon\"> <i class=\"fa fa-user fa-fw\" ng-class=\"{\n" +
    "            'text-muted' :    form.grade.$pristine,\n" +
    "            'text-success' :  form.grade.$valid && form.grade.$dirty,\n" +
    "            'text-danger' :   form.grade.$invalid && form.grade.$dirty,\n" +
    "          }\"></i> </div> <input placeholder=\"Grade\" autocomplete=\"off\" class=\"form-control\" type=\"text\" name=\"grade\" ng-model=\"route.grade\"> </div> <uib-rating ng-model=\"route.rating\" state-on=\"'fa fa-star fa-lg'\" state-off=\"'fa fa-star-o fa-lg'\"></uib-rating> <div class=\"input-group\"> <div class=\"input-group-addon\"> <i class=\"fa {{getIconStatus(route)}} fa-fw\" ng-class=\"{\n" +
    "            'text-muted' :    form.status.$pristine,\n" +
    "            'text-success' :  form.status.$valid && form.status.$dirty,\n" +
    "            'text-danger' :   form.status.$invalid && form.status.$dirty,\n" +
    "          }\"></i> </div> <select class=\"form-control\" name=\"status\" ng-model=\"route.status\"> <option>Attempt</option> <option>Redpoint</option> <option>Flash</option> <option>Onsight</option> </select> </div> <div class=\"input-group\"> <div class=\"input-group-addon\"> <i class=\"fa fa-calendar-o fa-fw\" ng-class=\"{\n" +
    "            'text-muted' :    form.date.$pristine,\n" +
    "            'text-success' :  form.date.$valid && form.date.$dirty,\n" +
    "            'text-danger' :   form.date.$invalid && form.date.$dirty,\n" +
    "          }\"></i> </div> <input type=\"date\" class=\"form-control\" required name=\"date\" ng-model=\"route.$date\"> </div> <div class=\"input-group\"> <div class=\"input-group-addon\"> <i class=\"fa fa-map-o fa-fw\" ng-class=\"{\n" +
    "            'text-muted' :    form.sector.$pristine,\n" +
    "            'text-success' :  form.sector.$valid && form.sector.$dirty,\n" +
    "            'text-danger' :   form.sector.$invalid && form.sector.$dirty,\n" +
    "          }\"></i> </div> <input placeholder=\"Sector\" autocomplete=\"off\" uib-typeahead=\"sector for sector in sectors | filter:$viewValue\" typeahead-on-select=\"sectorPopulatePlaceholder($item,route)\" class=\"form-control\" type=\"text\" name=\"sector\" ng-model=\"route.sector\"> </div> <div class=\"input-group\"> <div class=\"input-group-addon\"> <i class=\"fa fa-connectdevelop fa-fw\" ng-class=\"{\n" +
    "            'text-muted' :    form.type.$pristine,\n" +
    "            'text-success' :  form.type.$valid && form.type.$dirty,\n" +
    "            'text-danger' :   form.type.$invalid && form.type.$dirty,\n" +
    "          }\"></i> </div> <select class=\"form-control\" ng-model=\"route.type\" name=\"type\"> <option>Sport lead</option> <option>Boulder</option> <option>Traditional</option> <option>Multi-pitch</option> <option>Top rope</option> </select> </div> <div class=\"input-group\"> <div class=\"input-group-addon\"> <i class=\"fa {{getIconRock(route)}} fa-fw\" ng-class=\"{\n" +
    "            'text-muted' :    form.rock.$pristine,\n" +
    "            'text-success' :  form.rock.$valid && form.rock.$dirty,\n" +
    "            'text-danger' :   form.rock.$invalid && form.rock.$dirty,\n" +
    "          }\"></i> </div> <select class=\"form-control\" ng-model=\"route.rock\" name=\"rock\"> <option>Granite</option> <option>Sandstone</option> <option>Limestone</option> <option>Indoor</option> <option>Conglomerate</option> <option>Basalt</option> <option>Volcanic</option> </select> </div> <div class=\"input-group\"> <div class=\"input-group-addon\"> <i class=\"fa fa-map-marker fa-fw\" uib-tooltip=\"{{ form.location.$error.routeLocation ? 'Sorry, location not found' : '' }}\" ng-class=\"{\n" +
    "            'fa-pencil'           : !form.location.$pending,\n" +
    "            'fa-spinner fa-pulse' : form.location.$dirty && form.location.$pending,\n" +
    "            'text-muted' :    form.location.$pristine,\n" +
    "            'text-success' :  form.location.$valid && form.location.$dirty,\n" +
    "            'text-danger' :   form.location.$invalid && form.location.$dirty,\n" +
    "          }\"></i> </div> <input placeholder=\"Location\" class=\"form-control\" name=\"location\" type=\"text\" route-location ng-model-options=\"{ debounce: 500 }\" ng-model=\"route.location\" autocomplete=\"off\" uib-typeahead=\"location for location in locations | filter:$viewValue\">  </div> </form> </div>"
  );


  $templateCache.put('components/routes/views/sliderModal.html',
    "<div class=\"modal-unstyled slider-unstyled\"> <div class=\"modal-body\"> <div> <uib-carousel interval=\"myInterval\" no-wrap=\"noWrapSlides\"> <uib-slide ng-repeat=\"slide in slides\" active=\"slide.active\"> <div class=\"card-container manual-flip\" ng-class=\"{hover: slide.$hover}\" ng-init=\"route = slide.content\"> <card-route></card-route> </div> </uib-slide> </uib-carousel> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-success\" ng-click=\"flipCard()\"> <i class=\"fa fa-undo fa-flip-vertical\"></i> Flip </button> <button class=\"btn btn-primary\" ng-click=\"closeModal()\"> <i class=\"fa fa-times\"></i> </button> </div> </div>"
  );


  $templateCache.put('components/table/views/_routesTable.html',
    "<p class=\"hidden-xs\"> <button uib-tooltip=\"Add route\" class=\"btn btn-fab btn-raised btn-success\" ng-click=\"tableVm.addRoute()\"><i class=\"fa fa-plus\"></i></button> </p> <div ng-swipe-left=\"tableVm.nextPage()\" ng-swipe-right=\"tableVm.previousPage()\"> <table data-datatable=\"ng\" data-dt-options=\"tableVm.dtOptions\" dt-instance=\"tableVm.dtInstance\" class=\"table table-condensed table-hover\"> <thead> <tr> <th class=\"\">Name</th> <th class=\"\">Grade</th> <th class=\"hidden-xs hidden-sm\">Rating</th> <th class=\"hidden-xs\">Status</th> <th class=\"hidden-xs\">Date</th> <th class=\"\">Sector</th> <th class=\"hidden-xs\">Type</th> <th class=\"hidden-xs hidden-sm\">Rock</th> <th class=\"hidden-xs\">Location</th> </tr> </thead> <tbody> <tr ng-repeat=\"route in tableVm.routes\" ng-click=\"tableVm.openRouteModal(route)\" style=\"cursor:pointer\"> <td> <i class=\"fa {{tableVm.getIconStatus(route)}} text-muted\"></i> <a title=\"Route Details\"> {{route.name}} </a> <i ng-if=\"route.$sync\" class=\"fa fa-refresh text-info\" uib-tooltip=\"Offline {{route.$sync}}\"></i> </td> <td class=\"\"> <span>{{route.grade}}</span> </td> <td class=\"hidden-xs hidden-sm\"> <uib-rating readonly ng-model=\"route.rating\"></uib-rating> </td> <td class=\"hidden-xs\"> <span>{{route.status}}</span> </td> <td class=\"hidden-xs\"> <span>{{route.date}}</span> </td> <td class=\"\"> <span>{{route.sector}}</span> </td> <td class=\"hidden-xs\"> <span class=\"label label-success\" style=\"background-color:{{getTypeColor(route)}}\"> {{route.type}} </span> </td> <td class=\"hidden-xs hidden-sm\"> <span>{{route.rock}}</span> </td> <td class=\"hidden-xs\"> <span>{{route.location}}</span> </td> </tr> </tbody> </table> </div>"
  );


  $templateCache.put('components/timeline/views/_routesTimeline.html',
    "<div> <timeline> <timeline-event ng-repeat=\"event in timelineVm.events\"> <timeline-badge style=\"background-color:{{ timelineVm.getTypeColor(event) }}\" uib-tooltip=\"{{ timelineVm.getBadgeTooltip(event) }}\"> <i class=\"fa {{ timelineVm.getBadgeIcon(event) }}\"></i> </timeline-badge> <timeline-panel> <timeline-heading> <h4><i class=\"fa fa-map-marker\"></i> {{event.content.areaLocation}}</h4> <p> <small class=\"text-muted\"> <span class=\"hidden-xs\"> <i class=\"fa fa-calendar\"></i> From {{event.content.start }} to {{event.content.end}}</span> <span class=\"visible-xs\"> {{event.content.start | date:'shortdate' }} to {{event.content.end | date:'shortdate'}} </span> </small> </p> </timeline-heading> <div ng-repeat=\"routes in event.content.sectors\"> <p> <i class=\"fa fa-map-o\"></i> {{ routes[0].sector }} <span class=\"badge\">{{ routes.length }}</span> </p> <span ng-repeat=\"route in routes\"> <i class=\"fa {{timelineVm.getIconStatus(route)}} text-muted\"></i> <span class=\"text-muted\">{{route.grade}}</span> <a style=\"cursor:pointer\" title=\"Route Details\" ng-click=\"timelineVm.openRouteModal(route, routes)\"> {{route.name}} </a> <i ng-if=\"route.$sync\" class=\"fa fa-refresh text-info\" uib-tooltip=\"Offline {{route.$sync}}\"></i> <br> </span> </div> </timeline-panel> </timeline-event> </timeline> </div>"
  );


  $templateCache.put('components/users/views/_profileSummary.html',
    "<div class=\"panel panel-default\"> <div class=\"panel-body text-center\"> <div class=\"hidden-sm\"> <img ng-if=\"profile.picture\" width=\"112\" height=\"112\" alt=\"Profile picture\" class=\"img-circle\" ng-src=\"{{profile.picture}}\"> <span ng-if=\"!profile.picture\" class=\"fa-stack fa-4x\"> <i class=\"fa fa-circle fa-stack-2x\"></i> <i class=\"fa fa-book fa-stack-1x fa-inverse\"></i> </span> <h3> {{ profile.name }} </h3> <hr> <ul class=\"list-unstyled\"> <li ng-if=\"profile.email\"> <i class=\"fa fa-fw fa-envelope-o\"></i> <a href=\"mailto:{{profile.email}}\">{{ profile.email }}</a> </li> <li ng-if=\"profile.provider\"> <i class=\"fa fa-fw fa-{{ profile.provider }}\"></i> <a ng-href=\"{{ profile.link  }}\" target=\"_blank\"> {{ profile.name }} </a> </li> </ul> </div> <div class=\"visible-sm\"> <div class=\"row\"> <div class=\"col-sm-3\"> <img ng-if=\"profile.picture\" width=\"112\" height=\"112\" class=\"img-circle\" alt=\"Profile picture\" ng-src=\"{{profile.picture}}\"> <span ng-if=\"!profile.picture\" class=\"fa-stack fa-4x\"> <i class=\"fa fa-circle fa-stack-2x\"></i> <i class=\"fa fa-book fa-stack-1x fa-inverse\"></i> </span> </div> <div class=\"col-sm-9\"> <h3> {{ profile.name }} </h3> <ul class=\"list-unstyled\"> <li ng-if=\"profile.email\"> <i class=\"fa fa-fw fa-envelope-o\"></i> <a href=\"mailto:{{profile.email}}\">{{ profile.email }}</a> </li> <li ng-if=\"profile.provider\"> <i class=\"fa fa-fw fa-{{ profile.provider }}\"></i> <a ng-href=\"{{ profile.link  }}\" target=\"_blank\"> {{ profile.name }} </a> </li> </ul> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('components/users/views/_userLogin.html',
    "<div ng-if=\"!isLoggedIn()\"> <ul class=\"nav navbar-nav\"> <li class=\"dropdown\"> <a href=\"\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <i class=\"fa fa-sign-in\"></i> Log In <span class=\"caret\"></span> </a> <ul class=\"dropdown-menu\"> <li> <a href=\"\" ng-click=\"signIn('google')\"> <i class=\"fa fa-fw fa-google text-danger\"></i>Google</a> </li> <li class=\"disabled\"> <a href=\"\"> <i class=\"fa fa-fw fa-twitter text-info\"></i>Twitter</a> </li> <li class=\"disabled\"> <a href=\"\"> <i class=\"fa fa-fw fa-facebook text-info\"></i>Facebook</a> </li> </ul> </li> </ul> </div> <div ng-if=\"isLoggedIn()\"> <ul class=\"nav navbar-nav\"> <li class=\"dropdown\"> <a href=\"\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <i class=\"fa fa-user\"></i> {{name}} <span class=\"caret\"></span> <ul class=\"dropdown-menu\"> <li> <a href=\"\" ng-click=\"logOut()\"> <i class=\"fa fa-fw fa-sign-out\"></i> Log out</a> </li> </ul> </a></li> </ul> </div>"
  );
}])})()