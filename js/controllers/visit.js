angular.module('starter')
.controller('VisitCtrl', function($scope,$state,$location,$filter,$ionicLoading,$ionicPopup,$ionicModal,$timeout,$cordovaGeolocation,StorageService,RoadSalesListFac,RoadSalesHeaderFac,$cordovaDevice) 
{
	
    $scope.ShowModalNew = true;
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
                $scope.datas = [];
                $scope.selectitem = [];

                angular.forEach(response,function(value,key)
                {
                    var existingFilter = _.indexOf($scope.selectitem, value.username);
                    if (existingFilter == -1) 
                    {
                        $scope.selectitem.push(value.username);
                    }

                    var dateserver  = $filter('date')(new Date(value.CREATED_AT),'yyyy-MM-dd');
                    var datenow     = $filter('date')(new Date(),'yyyy-MM-dd');
                    if( (dateserver == datenow) && (value.USER_ID == profile.id))
                    {
                        value.EDIT_SHOW     = true;
                        value.ICON_CLASS    = 'ion-ios-plus-outline';
                    }
                    else
                    {
                        value.EDIT_SHOW     = false;
                        value.ICON_CLASS    = 'ion-eye';
                    }
                    $scope.datas.push(value)
                });
                console.log($scope.selectitem);
            },
            function(error)
            {
                console.log(error);
            })
            .finally(function()
            {
                $ionicLoading.show({template: 'Loading...',duration: 500});
                $scope.$broadcast('scroll.refreshComplete'); 
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
            if($filter('date')(start,'yyyy-MM-dd') == $filter('date')(today,'yyyy-MM-dd'))
            {
                $scope.ShowModalNew = true;
            }
            else
            {
                $scope.ShowModalNew = false;
            }
            $scope.onSearchChange();  
        }
    }

    $scope.OpenModalNew = function(item) 
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
            $scope.roadsalesman     = null;
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
        document.addEventListener("deviceready", function () 
        {
            $scope.devicemodel      = $cordovaDevice.getModel();
            $scope.deviceplatform   = $cordovaDevice.getPlatform();
            $scope.deviceuuid       = $cordovaDevice.getUUID();
            $scope.deviceversion    = $cordovaDevice.getVersion();
        }, false);

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
        roadsalesman.UUID           = $scope.deviceuuid;

        $ionicLoading.show
        ({
            template: 'Loading...'
        })
        .then(function()
        {
            RoadSalesHeaderFac.CreateRoadSalesHeader(roadsalesman)
            .then(function(response)
            {
                var checkdiselect = _.contains($scope.selectitem, profile.username);
                if(!checkdiselect)
                {
                    $scope.selectitem.push(profile.username);
                }
                roadsalesman.ROAD_D         = response.ROAD_D;
                roadsalesman.EDIT_SHOW      = true;
                roadsalesman.ICON_CLASS     = 'ion-ios-plus-outline';
                roadsalesman.username       = profile.username;
                $scope.datas.push(roadsalesman);
                $scope.closeModal();
            },
            function(error)
            {
                alert("Gagal Menyimpan Ke Server.Kirim Kembali");
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

    $scope.OpenModalViewOrEdit = function(item)
    {
        if(item.EDIT_SHOW)
        {
           $scope.openModalEditVisit(item); 
        }
        else
        {
            $scope.openModalView(item);
        }
    }

    $scope.openModalEditVisit = function(item)
    {
        var toarr = item.CASE_NM;
        var array = toarr.split(",");
        $ionicLoading.show
        ({
          template: 'Loading...'
        })
        .then(function()
        {
            RoadSalesListFac.GetRoadSalesList()
            .then(function(response)
            {
                $scope.devList = [];
                angular.forEach(response,function(value,key)
                {
                    var y = array.includes(value.CASE_NAME);
                    if(y)
                    {
                        value.checked = true;  
                    }
                    else
                    {
                        value.checked = false;
                    }
                    
                    $scope.devList.push(value);
                });
            })
            .finally(function()
            {
                $ionicLoading.show({template: 'Loading...',duration: 500});
            });
        });

        $ionicModal.fromTemplateUrl('templates/visit/edit.html', 
        {
            scope: $scope
        })
        .then(function(modal) 
        {
            $scope.roadsalesman     = item;
            $scope.modal            = modal;
            $scope.modal.show();
        });
    }

    $scope.updateForm = function(roadsalesman)
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
        var resultid                = arrayid.join(",");
        var resultnama              = arraynama.join(",");
        roadsalesman.CASE_ID        = resultid;
        roadsalesman.CASE_NM        = resultnama;
        roadsalesman.UPDATE_AT      = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');;
        $ionicLoading.show
        ({
            template: 'Loading...'
        })
        .then(function()
        {
            RoadSalesHeaderFac.UpdateRoadSalesHeader(roadsalesman)
            .then(function(response)
            {
                $scope.closeModal();
                alert("Data Berhasil Disimpan");
            },
            function(error)
            {
                console.log(error);
                alert("Data Gagal Disimpan.Ulangi Lagi");
            })
            .finally(function()
            {
                $ionicLoading.show({template: 'Loading...',duration: 500}); 
            });
        });
    }

    $scope.openModalView = function(item)
    {
        var toarr       = item.CASE_NM;
        $scope.devList  = toarr.split(",");
        $ionicModal.fromTemplateUrl('templates/visit/view.html', 
        {
            scope: $scope
        })
        .then(function(modal) 
        {
            $scope.viewroad         = item;
            $scope.viewmodal        = modal;
            $scope.viewmodal.show();
        });
    }
    
    $scope.CloseModelView = function() 
    {
        $scope.viewmodal.remove();
    };
    $scope.$on('$destroy', function() 
    {
        $scope.viewmodal.remove();
    });

    $scope.itemparams = function(item)
    {
        StorageService.set('itemgambar',item);
        $state.go('tab.visit-detail', {'detail':item.ROAD_D});
    }

})

.controller('VisitDetailCtrl', 
function($rootScope,$scope,$location,$timeout,$stateParams,$filter,$ionicLoading,$ionicPopup,$ionicModal,$cordovaCamera,RoadSalesImageFac,UtilService,StorageService) 
{
    $scope.profile          = StorageService.get('profile');
    $scope.datagambar       = StorageService.get('itemgambar');
    $scope.tglgambarheader  = $filter('date')(new Date($scope.datagambar.CREATED_AT),'yyyy-MM-dd');
    $scope.tanggalsekarang  = $filter('date')(new Date(),'yyyy-MM-dd');
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
            $scope.image    = response;
            $scope.images   = UtilService.ArrayChunk($scope.image,2);  
        },
        function(error)
        {
            alert("Error");
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
                data.CREATED_BY     = $scope.profile.id;
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
                        $scope.image.push(data);
                        $scope.images   = UtilService.ArrayChunk($scope.image,2);
                    },
                    function(error)
                    {
                        alert("Gambar Gagal Diupload");
                    })
                    .finally(function()
                    {
                        $ionicLoading.show({template: 'Loading...',duration: 500}); 
                    });
                });
            });
        }, false); 
    }
    $scope.showImages = function(index) 
    {
        $scope.activeSlide = index;
        $scope.showModal('templates/visit/image-popover.html');
    }
 
    $scope.showModal = function(templateUrl) 
    {
        $ionicModal.fromTemplateUrl(templateUrl, 
        {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) 
        {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }
 
    $scope.closeModal = function() 
    {
        $scope.modal.hide();
        $scope.modal.remove()
    };

    $scope.getdata  = function(item)
    {

        var quality = [0.0, 1.0];
        function imageToDataUri(img, width, height) 
        {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            ctx.scale(1, 1);
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            return canvas.toDataURL();
        }
        var img     = new Image;
        img.onload  = resizeImage;
        img.src     = item;

        function resizeImage() 
        {
            var newDataUri = imageToDataUri(img, 500, 500);
            return newDataUri;
        }
        return(img.onload());
    }
});