angular.module('starter')
.controller('PromoActiveCtrl', function($scope,$location,$ionicLoading,$ionicModal,$filter,PromoFac) 
{
    $ionicLoading.show
    ({
      template: 'Loading...'
    })
    .then(function()
    {
        var statuspromo = 0;
        PromoFac.GetPromos(statuspromo)
        .then(function(response)
        {
            $scope.promos = response;     
            
        })
        .finally(function()
        {
            $ionicLoading.show({template: 'Loading...',duration: 500});
            $scope.$broadcast('scroll.refreshComplete');
        });
    });
    $scope.onDoubleTap = function(item)
    {
        $ionicModal.fromTemplateUrl('templates/promo/promo-popover.html', 
        {
            scope: $scope
        })
        .then(function(modal) 
        {
            $ionicLoading.show({template: 'Loading...',duration: 300});
            $scope.modal            = modal;
            $scope.item             = item;

            console.log(item);
            $scope.modal.show();
            
        });
    }
    $scope.closeModal = function() 
    {
        $scope.modal.remove();
    };

    $scope.converdate = function(item)
    {
        var result = $filter('date')(new Date(item),'dd-MM-yyyy');
        return result;
    }
})

.controller('PromoFinishCtrl', function($scope,$location,$filter,$ionicLoading,$ionicModal,PromoFac) 
{
    $ionicLoading.show
    ({
      template: 'Loading...'
    })
    .then(function()
    {
        var statuspromo = 1;
        PromoFac.GetPromos(statuspromo)
        .then(function(response)
        {
            $scope.promos = response;     
            
        })
        .finally(function()
        {
            $ionicLoading.show({template: 'Loading...',duration: 500});
            $scope.$broadcast('scroll.refreshComplete');
        });
    });
    $scope.onDoubleTap = function(item)
    {
        $ionicModal.fromTemplateUrl('templates/promo/promo-popover.html', 
        {
            scope: $scope
        })
        .then(function(modal) 
        {
            $ionicLoading.show({template: 'Loading...',duration: 300});
            $scope.modal            = modal;
            $scope.item             = item;

            console.log(item);
            $scope.modal.show();
            
        });
    }
    $scope.closeModal = function() 
    {
        $scope.modal.remove();
    };

    $scope.converdate = function(item)
    {
        var result = $filter('date')(new Date(item),'dd-MM-yyyy');
        return result;
    }
})

.controller('PromoDetailCtrl', function($scope,$stateParams,$location,$ionicLoading) 
{
    console.log($stateParams.detail);
});
