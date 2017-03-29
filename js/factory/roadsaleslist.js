angular.module('starter')
.factory('RoadSalesListFac',function($http,$q,$filter,UtilService)
{
    var GetRoadSalesList = function()
    {
        var getUrl          = UtilService.ApiUrl();
        var deferred        = $q.defer();
        var url             = getUrl + "master/roadsaleslists";
        $http.get(url)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data.Roadsaleslist);
        })
        .error(function(err,status)
        {
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

    var CreateRoadListHeader = function(data)
    {
        var globalurl           = UtilService.ApiUrl();
        var deferred            = $q.defer();
        var url                 = globalurl + "master/roadsaleslists";

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
            GetRoadSalesList:GetRoadSalesList,
            CreateRoadListHeader:CreateRoadListHeader
        }
});