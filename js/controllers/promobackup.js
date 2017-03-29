angular.module('starter')
.controller('PromoCtrl', function($scope,$location,$ionicLoading,uiCalendarConfig,PromoFac) 
{
    $ionicLoading.show
    ({
      template: 'Loading...'
    })
    .then(function()
    {
        PromoFac.GetPromos()
        .then(function(response)
        {
            
            
        })
        .finally(function()
        {
            $ionicLoading.show({template: 'Loading...',duration: 500});
            $scope.$broadcast('scroll.refreshComplete');
        });
    });
    
    $scope.events  = [];
    $scope.uiConfig = 
    {
      calendar:
      {
        height: 500,
        editable: false,
        header:
        {
          left: 'title',
          center: '',
          right: 'today prev,next'
        },

        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };
    var data    = {};
    data.title  = 'Buy 1-1';
    data.start  = new Date();
    data.allDay = true;
    data.url    = "#/tab/promo/" + 1;
    data.color  = '#000039';

    $scope.events.push(data);
    var data    = {};
    data.title  = 'Buy 1-2';
    data.start  = new Date();
    data.allDay = true;
    data.url    = "#/tab/promo/" + 2;
    data.color  = '#ff4b39';

    $scope.events.push(data); 
    $scope.eventSources = [$scope.events];
    
})

.controller('PromoDetailCtrl', function($scope,$stateParams,$location,$ionicLoading,uiCalendarConfig) 
{
    console.log($stateParams.detail);
});
