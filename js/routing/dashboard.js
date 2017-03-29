angular.module('starter')
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) 
{
  $stateProvider.state('tab.dash', 
  {
      url: '/dash',
      views: 
      {
          'tab-dash': 
            {
              templateUrl: 'templates/dashboard/tab-dash.html',
              controller: 'DashCtrl'
          }
      }
  })

  .state('tab.dash-call', 
  {
      url: '/dash/customer/:call',
      views: 
      {
          'tab-dash': 
          {
            templateUrl: 'templates/dashboard/tab-dash-call.html',
            controller: 'CustomerCallCtrl'
          }
      }
  })

  .state('tab.dash-call-jadwal', 
  {
      url: '/dash/customer/:call/:jadwal',
      views: 
      {
          'tab-dash': 
          {
            templateUrl: 'templates/dashboard/tab-dash-call-jadwal.html',
            controller: 'CustomerCallJadwalCtrl'
          }
      }
  })
  
});
