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
