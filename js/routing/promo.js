angular.module('starter')
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) 
{
    $stateProvider.state('tab.promo', 
    {
        url: '/promo',
        views: 
        {
          'tab-promo': 
          {
            templateUrl: 'templates/promo/index.html',
            controller: 'PromoCtrl'
          }
        }
    });
    $stateProvider.state('tab.promo-detail', 
    {
        url: '/promo/:detail',
        views: 
        {
          'tab-promo': 
          {
            templateUrl: 'templates/promo/view.html',
            controller: 'PromoDetailCtrl'
          }
        }
    });
});
