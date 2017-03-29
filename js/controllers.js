angular.module('starter')
.controller('AppCtrl', function($rootScope,$scope, $state,StorageService) 
{
  var profile = StorageService.get('profile');
  $scope.profile = profile;
  $scope.logout = function() 
  {
      StorageService.destroy('profile');
      $state.go('auth.login',{},{reload: true});
  };
});