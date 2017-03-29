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
                  controller:'NooAdminCtrl'
              }
          },
    });

    $stateProvider.state('tab.noo.admin-detail', 
    {
          url: "/admindetail/:id",
          views: {
              'noo-admin': {
                  templateUrl: "templates/noo/noo-new-detail.html",
                  controller:'NooAdminDetailCtrl'
              }
          }
    });

    $stateProvider.state('tab.noo.kam', 
    {
          url: "/kam",
          views: 
          {
              'noo-kam': 
              {
                  templateUrl: "templates/noo/noo-kam.html",
                  controller:'NooKamCtrl'
              }
          },
    });
    $stateProvider.state('tab.noo.kam-detail', 
    {
          url: "/kamdetail/:id",
          views: {
              'noo-kam': {
                  templateUrl: "templates/noo/noo-new-detail.html",
                  controller:'NooKamDetailCtrl'
              }
          }
    });

    $stateProvider.state('tab.noo.accounting', 
    {
          url: "/accounting",
          views: 
          {
              'noo-accounting': 
              {
                  templateUrl: "templates/noo/noo-accounting.html",
                  controller:'NooAccountingCtrl'
              }
          },
    });
    $stateProvider.state('tab.noo.accounting-detail', 
    {
          url: "/accountingdetail/:id",
          views: {
              'noo-accounting': {
                  templateUrl: "templates/noo/noo-accounting-detail.html",
                  controller:'NooAccountingDetailCtrl'
              }
          }
    });
});
