angular.module('starter')
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) 
{
    $stateProvider.state('tab.foodtown', 
    {
          url: '/foodtown',
          abstract: true,
          views: 
          {
            'tab-foodtown': 
            {
              templateUrl: 'templates/foodtown/main.html'
            }
          }
    });
    $stateProvider.state('tab.foodtown.index', 
    {
          url: "/index",
          views: 
          {
              'foodtown-index': 
              {
                  templateUrl: "templates/foodtown/index.html",
                  controller:'NooNewCtrl'
              }
          },
    });
});
