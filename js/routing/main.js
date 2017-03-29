angular.module('starter')
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) 
{

  $stateProvider.state('tab', 
  {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'AppCtrl',
    resolve:
    {
        auth: function ($q, SecuredFac,$injector,$location) 
        {
            var userInfo = SecuredFac.getUserInfo();
            if(userInfo)
            {
                return $q.when(userInfo);
            }
            else 
            {
                $location.path("/auth/login");
                console.log();
            }
        }  
    }
  })

  .state('tab.account', 
  {
      url: '/account',
      views: 
      {
        'tab-account': 
        {
          templateUrl: 'templates/secured/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
  })

  .state('tab.notif', 
  {
      url: '/notif',
      views: 
      {
        'tab-notif': 
        {
          templateUrl: 'templates/notifikasi/index.html',
          controller: 'NotifikasiCtrl'
        }
      }
  })

  .state('tab.logout', 
  {
      url: '/logout',
      views: 
      {
        'tab-logout': 
        {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
  });

  $urlRouterProvider.otherwise('/tab/dash');
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');

});
