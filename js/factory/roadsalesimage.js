angular.module('starter')
.factory('RoadSalesImageFac',function($http,$q,$filter,UtilService)
{

    var GetRoadSalesImageByIdRoadSales = function(id)
    {
        var getUrl          = UtilService.ApiUrl();
        var deferred        = $q.defer();
        var url             = getUrl + "master/roadsalesimages/search?ID_ROAD=" + id;
        $http.get(url)
        .success(function(data,status,headers,config) 
        {
            if(angular.isDefined(data.statusCode))
            {
                deferred.resolve([]);
            }
            else
            {
                deferred.resolve(data.Roadsalesimage);   
            }
            
        })
        .error(function(err,status)
        {
            console.log(err);
            if (status === 404)
            {
                deferred.resolve([]);
            }
            else    
            {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    var CreateRoadSalesImage = function(data)
    {
        var globalurl           = UtilService.ApiUrl();
        var deferred            = $q.defer();
        var url                 = globalurl + "master/roadsalesimages";

        var result              = UtilService.SerializeObject(data);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(url,serialized,config)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
        })
        .error(function(err,status)
        {
            deferred.reject(err);
        });
        return deferred.promise;  
    }

    return{
            GetRoadSalesImageByIdRoadSales:GetRoadSalesImageByIdRoadSales,
            CreateRoadSalesImage:CreateRoadSalesImage
        }
});