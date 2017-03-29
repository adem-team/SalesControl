angular.module('starter')
.config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider,$ionicConfigProvider) 
{
    $stateProvider.state('auth', 
    {
        url: '/auth',
        templateUrl: 'templates/secured/mainlogin.html',
        abstract:true,
    });
    $stateProvider.state('auth.login', 
    {
        url: '/login',
        views: 
        {
            'login-tab': 
            {
              templateUrl: 'templates/secured/login.html',
              controller: 'LoginCtrl',
            }
        },
        resolve:
        {
            auth: function ($q,SecuredFac,$location) 
            {
                var userInfo = SecuredFac.getUserInfo();
                if(userInfo)
                {
                    $location.path("/main/dashboard");
                    $apply();
                }
            }
        }
    });
});