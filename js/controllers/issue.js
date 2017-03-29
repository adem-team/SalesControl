angular.module('starter')
.controller('IssueCtrl', function($scope,$location,$filter,$ionicLoading,$ionicPopup,$ionicModal,$timeout,IssueFac) 
{
    var tanggalplan = $filter('date')(new Date(),'yyyy-MM-dd');
    var firstDay            = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    var lastDay             = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    $scope.exampleForm      = {valuestart:firstDay,valueend:lastDay};
    $scope.onSearchChange = function()
    {
        var tglstart    = $filter('date')($scope.exampleForm.valuestart,'yyyy-MM-dd');
        var tglend      = $filter('date')($scope.exampleForm.valueend,'yyyy-MM-dd');
        $ionicLoading.show
        ({
            template: 'Loading...'
        })
        .then(function()
        {
            IssueFac.GetIssue(tglstart,tglend)
            .then(function (response)
            {
                $scope.actionmemos = response;
            },
            function(error)
            {
                console.log(error);
            })
            .finally(function()
            {
                $ionicLoading.show({template: 'Loading...',duration: 500}); 
            });
        });
    }
    $scope.onSearchChange();

    $scope.SubmitForm = function(exampleForm)
    {
        var start       = exampleForm.valuestart;
        var end         = exampleForm.valueend;
        if(start > end)
        {
            alert("Tanggal End Harus Lebih Besar Dari Tanggal Start");
        }
        else
        {
            $scope.onSearchChange();  
        }
    }
})

.controller('IssueDetailCtrl', 
function($rootScope,$scope,$location,$timeout,$stateParams,$filter,$ionicLoading,$ionicPopup,$ionicModal,$cordovaCamera,RoadSalesImageFac,UtilService,StorageService) 
{
    var profile             = StorageService.get('profile');
    var idroadsales         = $stateParams.detail;
    $ionicLoading.show
    ({
        template: 'Loading...'
    })
    .then(function()
    {
        RoadSalesImageFac.GetRoadSalesImageByIdRoadSales(idroadsales)
        .then(function(response)
        {
            $scope.image = [];
            if(angular.isArray(response))
            {
               var lengthgambar = response.length;
               if(lengthgambar < 4) 
               {
                    var sisagambar = 4 - lengthgambar;
                    for(i=0;i < sisagambar; i++)
                    {
                        response.push({'IMGBASE64':'img/camera.jpg'});
                    }
               }
               $scope.image = response;
            }
            else
            {
               $scope.image = [{'IMGBASE64':'img/camera.jpg'},{'IMGBASE64':'img/camera.jpg'},{'IMGBASE64':'img/camera.jpg'},{'IMGBASE64':'img/camera.jpg'}]; 
            }
            $scope.images = UtilService.ArrayChunk($scope.image,2);  
        },
        function(error)
        {
            console.log(error);
        })
        .finally(function()
        {
            $ionicLoading.show({template: 'Loading...',duration: 500}); 
        });
    });

    $scope.ambilgambar = function(parent,child)
    {
        document.addEventListener("deviceready", function () 
        {
            var options = $rootScope.getCameraOptions();
            $cordovaCamera.getPicture(options)
            .then(function (imageData) 
            {
                var data = {};
                data.ID_ROAD        = idroadsales;
                data.IMGBASE64      = 'data:image/jpeg;base64,' + imageData;
                data.STATUS         = 1; 
                data.CREATED_BY     = profile.id;
                data.CREATED_AT     = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                $ionicLoading.show
                ({
                    template: 'Loading...'
                })
                .then(function()
                {
                    RoadSalesImageFac.CreateRoadSalesImage(data)
                    .then(function(response)
                    {   
                        $scope.images[parent][child].IMGBASE64  = data.IMGBASE64;
                    },
                    function(error)
                    {
                        console.log(error);
                    })
                    .finally(function()
                    {
                        $ionicLoading.show({template: 'Loading...',duration: 500}); 
                    });
                });
            });
        }, false);
    }
});