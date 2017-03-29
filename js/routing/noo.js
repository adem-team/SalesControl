angular.module('starter')
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) 
{
    $stateProvider.state('tab.noo', 
    {
          url: '/noo',
          abstract: true,
          views: 
          {
            'tab-noo': 
            {
              templateUrl: 'templates/noo/index.html'
            }
          }
    });
    $stateProvider.state('tab.noo.new', 
    {
          url: "/new",
          views: 
          {
              'noo-new': 
              {
                  templateUrl: "templates/noo/noo-new.html",
                  controller:'NooNewCtrl'
              }
          },
    });
    $stateProvider.state('tab.noo.new-detail', 
    {
          url: "/newdetail/:id",
          views: {
              'noo-new': {
                  templateUrl: "templates/noo/noo-new-detail.html",
                  controller:'NooNewDetailCtrl'
              }
          }
    });

    $stateProvider.state('tab.noo.admin', 
    {
          url: "/admin",
          views: 
          {
              'noo-admin': 
              {
                  templateUrl: "templates/noo/noo-admin.html",
                  controller:'NooNewCtrl'
              }
          },
    });
    $stateProvider.state('tab.noo.nka', 
    {
          url: "/nka",
          views: 
          {
              'noo-nka': 
              {
                  templateUrl: "templates/noo/noo-nka.html",
                  controller:'NooNewCtrl'
              }
          },
    });
    $stateProvider.state('tab.noo.accounting', 
    {
          url: "/accounting",
          views: 
          {
              'noo-accounting': 
              {
                  templateUrl: "templates/noo/noo-accounting.html",
                  controller:'NooNewCtrl'
              }
          },
    });
});
