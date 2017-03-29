angular.module('starter')
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) 
{
    $stateProvider.state('tab.visit', 
    {
        url: '/visit',
        views: 
        {
          'tab-visit': 
          {
            templateUrl: 'templates/visit/index.html',
            controller: 'VisitCtrl'
          }
        }
    })

    .state('tab.visit-detail', 
    {
        url: '/visit/:detail',
        views: 
        {
          'tab-visit': 
          {
            templateUrl: 'templates/visit/visitdetail.html',
            controller: 'VisitDetailCtrl'
          }
        }
    });

});
