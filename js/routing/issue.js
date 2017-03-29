angular.module('starter')
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) 
{
    $stateProvider.state('tab.issue', 
    {
        url: '/issue',
        views: 
        {
          'tab-issue': 
          {
            templateUrl: 'templates/issue/index.html',
            controller: 'IssueCtrl'
          }
        }
    })

    .state('tab.issue-detail', 
    {
        url: '/issue/:detail',
        views: 
        {
          'tab-issue': 
          {
            templateUrl: 'templates/issue/issuedetail.html',
            controller: 'IssueDetailCtrl'
          }
        }
    });

});
