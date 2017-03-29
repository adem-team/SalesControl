angular.module('starter')
.factory('RoadSalesHeaderFac',function($http,$q,$filter,UtilService)
{
    var GetRoadSalesHeader = function(tanggalstart,tanggalend,USER_ID)
    {
        var getUrl          = UtilService.ApiUrl();
        var deferred        = $q.defer();
        var url             = getUrl + "master/roadsalesheaders/search?TGLSTART="+ tanggalstart + "&TGLEND="+ tanggalend + "&USER_ID=" + USER_ID;
        $http.get(url)
        .success(function(data,status,headers,config) 
        {
            if(angular.isDefined(data.statusCode))
            {
                deferred.resolve([]);  
            }
            else
            {
                deferred.resolve(data.Roadsalesheader); 
            }
        })
        .error(function(err,status)
        {
            if (status === 404)
            {
                
            }
            else    
            {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }
    var CreateRoadSalesHeader = function(data)
    {
        var globalurl           = UtilService.ApiUrl();
        var deferred            = $q.defer();
        var url                 = globalurl + "master/roadsalesheaders";

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
            GetRoadSalesHeader:GetRoadSalesHeader,
            CreateRoadSalesHeader:CreateRoadSalesHeader
		}
});