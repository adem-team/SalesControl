angular.module('starter')
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) 
{
  $stateProvider.state('tab.salesman', {
      url: '/salesman',
      views: {
        'tab-salesman': {
          templateUrl: 'templates/salesmans/tab-salesman.html',
          controller: 'SalesmanCtrl'
        }
      }
    })
    .state('tab.salesman-detail', {
      url: '/salesman/:salesmanid',
      views: {
        'tab-salesman': {
          templateUrl: 'templates/salesmans/salesmans-detail.html',
          controller: 'SalesmanDetailCtrl'
        }
      }
    })
    .state('tab.salesman-detail-detail', {
      url: '/salesman/:salesmanid/:id',
      views: {
        'tab-salesman': {
          templateUrl: 'templates/salesmans/salesmans-detail-detail.html',
          controller: 'SalesmanDetailDetailCtrl'
        }
      }
    })
});
