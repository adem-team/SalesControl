angular.module('starter')
.controller('SalesmanCtrl', function($scope,$filter,$ionicLoading,SalesTrackFac) 
{
    var tanggalplan         = $filter('date')(new Date(),'yyyy-MM-dd');
    $scope.doRefresh    = function()
    {
        $ionicLoading.show
        ({
          template: 'Loading...'
        })
        .then(function()
        {
            SalesTrackFac.GetSalesTrackAbsensi(tanggalplan)
            .then(function(response)
            {
                if(angular.isArray(response))
                {
                    $scope.salesmans = response; 
                }
                else
                {
                    $scope.salesmans = []; 
                }
            })
            .finally(function()
            {
                $ionicLoading.show({template: 'Loading...',duration: 500});
                $scope.$broadcast('scroll.refreshComplete');  
            });
        });
    }
    $scope.doRefresh();

})

.controller('SalesmanDetailCtrl', function($scope,$filter,$ionicLoading,$stateParams,SalesTrackFac) 
{
    var tanggalplan         = $filter('date')(new Date(),'yyyy-MM-dd');
    var userid				= $stateParams.salesmanid;
    $scope.doRefresh    = function()
    {
        $ionicLoading.show
        ({
          template: 'Loading...'
        })
        .then(function()
        {
            SalesTrackFac.GetSalesTrack(tanggalplan,userid)
            .then(function(response)
            {
                $scope.customers = response;
                console.log($scope.customers);
            })
            .finally(function()
            {
                $ionicLoading.show({template: 'Loading...',duration: 500});
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    }
    $scope.doRefresh();
})

.controller('SalesmanDetailDetailCtrl', function($scope, $stateParams, Chats) 
{
    $scope.chat = Chats.get($stateParams.chatId);
});
