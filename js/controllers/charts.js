angular.module('starter')
.controller('ChartStockCtrl', function($scope,$state,$ionicPopup,$ionicLoading,ChartsFac) 
{
    $ionicLoading.show
    ({
      template: 'Loading...'
    })
    .then(function()
    {
        ChartsFac.GetCustomerStockCharts()
        .then(function(response)
        {
            FusionCharts.ready(function () 
            {
                var geoChart = new FusionCharts({
                type: 'mscolumn3d',
                renderAt: 'chart-stockgeo',
                width: '100%',
                dataFormat: 'json',
                dataSource: response.StockPerGeo
                });
                geoChart.render();

                var StockPerProducts = new FusionCharts(
                {
                    type: 'column3d',
                    renderAt: 'chart-stockperproducts',
                    width: '100%',
                    dataFormat: 'json',
                    dataSource: response.StockTotalPerProducts
                });
                StockPerProducts.render();
            }); 
        })
        .finally(function()
        {
            $ionicLoading.show({template: 'Loading...',duration: 5000});
        });
    });
})

.controller('ChartExpiredCtrl', function($scope,$state,$filter,$ionicPopup,$ionicLoading,ChartsFac) 
{   
    $scope.example = {value: new Date()};
    $scope.onSearchChange = function()
    {
        var tahunbulan = $filter('date')($scope.example.value,'yyyy-MM');

        $ionicLoading.show
        ({
          template: 'Loading...'
        })
        .then(function()
        {

            ChartsFac.GetCustomerExpiredCharts(tahunbulan)
            .then(function(response)
            {
                FusionCharts.ready(function () 
                {
                    var ExpiredGeo = new FusionCharts(
                    {
                        type: 'mscolumn3d',
                        renderAt: 'chart-expiredgeomonth',
                        width: '100%',
                        dataFormat: 'json',
                        dataSource: response.ExpiredPerGeo
                    });
                    ExpiredGeo.render();

                    var TotalExpired = new FusionCharts({
                        type: 'column3d',
                        renderAt: 'chart-totalexpired',
                        width: '100%',
                        dataFormat: 'json',
                        dataSource: response.TotalExpired
                    });
                    TotalExpired.render();

                    var ExpiredAllYear = new FusionCharts({
                        type: 'mscolumn3d',
                        renderAt: 'chart-expiredallyear',
                        width: '100%',
                        dataFormat: 'json',
                        dataSource: response.ExpiredAllYear
                    });
                    ExpiredAllYear.render();
                }); 
            })
            .finally(function()
            {
                $ionicLoading.show({template: 'Loading...',duration: 300});
            });
        });
    }
    $scope.onSearchChange();
});