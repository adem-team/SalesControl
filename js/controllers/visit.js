angular.module('starter')
.controller('VisitCtrl', function($scope,$location,$filter,$ionicLoading,$ionicPopup,$ionicModal,$timeout,$cordovaGeolocation,StorageService,RoadSalesListFac,RoadSalesHeaderFac) 
{
	var profile = StorageService.get('profile');
    var firstDay            = new Date();
    $scope.exampleForm      = {valuestart:firstDay};
    $scope.onSearchChange = function()
    {
        var tglstart    = $filter('date')($scope.exampleForm.valuestart,'yyyy-MM-dd');
        var tglend      = $filter('date')($scope.exampleForm.valuestart,'yyyy-MM-dd');

        $ionicLoading.show
        ({
          template: 'Loading...'
        })
        .then(function()
        {
            RoadSalesHeaderFac.GetRoadSalesHeader(tglstart,tglend,profile.id)
            .then(function (response)
            {
                $scope.datas = response;
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

    $scope.ChangeDate = function(exampleForm)
    {
        var start       = exampleForm.valuestart;
        var today       = new Date();
        if(start > today)
        {
            alert("Tanggal Yang Anda Pilih Tidak Bisa Lebih Besar Dari Tanggal Sekarang");
        }
        else
        {
            $scope.onSearchChange();  
        }
    }

    $scope.openModalMap = function(item) 
    {
        RoadSalesListFac.GetRoadSalesList()
        .then(function(response)
        {
            $scope.devList = [];
            angular.forEach(response,function(value,key)
            {
                value.checked = false;
                $scope.devList.push(value);
            });
        });
        $ionicModal.fromTemplateUrl('templates/visit/new.html', 
        {
            scope: $scope,
            animation: 'fade-in-scale'
        })
        .then(function(modal) 
        {
            $ionicLoading.show({template: 'Loading...',duration: 500});
            $scope.modal            = modal;
            $scope.modal.show();
        });  
    };

    $scope.closeModal = function() 
    {
        $scope.modal.remove();
    };
    $scope.$on('$destroy', function() 
    {
        $scope.modal.remove();
    });

    $scope.submitForm = function(roadsalesman)
    {
        var arraynama = [];
        var arrayid   = [];
        angular.forEach($scope.devList,function(value,key)
        {
            if(value.checked)
            {
                arraynama.push(value.CASE_NAME);
                arrayid.push(value.ID);
            }
        });
        var resultid   = arrayid.join(",");
        var resultnama = arraynama.join(",");
        

        roadsalesman.CREATED_AT     = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        roadsalesman.CREATED_BY     = profile.id;
        roadsalesman.USER_ID        = profile.id;
        roadsalesman.LAT            = $scope.lat;
        roadsalesman.LAG            = $scope.longi;
        roadsalesman.STATUS         = 1;
        roadsalesman.CASE_ID        = resultid;
        roadsalesman.CASE_NM        = resultnama;

        $ionicLoading.show
        ({
            template: 'Loading...'
        })
        .then(function()
        {
            RoadSalesHeaderFac.CreateRoadSalesHeader(roadsalesman)
            .then(function(response)
            {
                roadsalesman.ROAD_D     = response.ROAD_D;
                $scope.datas.push(roadsalesman);
                $scope.closeModal();
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

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function (position) 
    {
        $scope.lat      = position.coords.latitude;
        $scope.longi    = position.coords.longitude;
    }, 
    function(err) 
    {
        $scope.lat      = 0;
        $scope.longi    = 0;
    });

})

.controller('VisitDetailCtrl', 
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