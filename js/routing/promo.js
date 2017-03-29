angular.module('starter')
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) 
{
    $stateProvider.state('tab.promo', 
    {
          url: '/promo',
          abstract: true,
          views: 
          {
            'tab-promo': 
            {
              templateUrl: 'templates/promo/main.html'
            }
          }
    });

    $stateProvider.state('tab.promo.running', 
    {
        url: '/running',
        views: 
        {
          'promo-running': 
          {
            templateUrl: 'templates/promo/running.html',
            controller: 'PromoActiveCtrl'
          }
        }
    });
    $stateProvider.state('tab.promo.finish', 
    {
        url: '/finish',
        views: 
        {
          'promo-finish': 
          {
            templateUrl: 'templates/promo/finish.html',
            controller: 'PromoFinishCtrl'
          }
        }
    });
});
