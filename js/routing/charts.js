angular.module('starter')
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) 
{
    $stateProvider.state('tab.charts', 
    {
          url: '/charts',
          abstract: true,
          views: 
          {
            'tab-charts': 
            {
              templateUrl: 'templates/charts/index.html',
            }
          }
    });

    $stateProvider.state('tab.charts.stock', 
    {
          url: "/stock",
          views: 
          {
              'stock-charts': 
              {
                  templateUrl: "templates/charts/stock-charts.html",
                  controller:'ChartStockCtrl'
              }
          },
    });
    $stateProvider.state('tab.charts.expired', 
    {
          url: "/expired",
          views: 
          {
              'expired-charts': 
              {
                  templateUrl: "templates/charts/expired-charts.html",
                  controller:'ChartExpiredCtrl'
              }
          }
    });
});
