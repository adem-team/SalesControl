angular.module('starter')
.factory('DashboardFac',function($http,$q,$filter,UtilService)
{
    var GetDashboardChart = function(tanggalstart)
    {
        var getUrl          = UtilService.ApiUrl();
        var deferred        = $q.defer();
        var url             = getUrl + "chart/esmsalescontrols?TGLSTART="+ tanggalstart;
        $http.get(url)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
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

    var GetCustomerCall = function(tanggalplan,action)
    {
        var getUrl          = UtilService.ApiUrl();
        var deferred        = $q.defer();
        var url             = getUrl + "chart/esmsalescontroldetailusercalls?MONTH=" + tanggalplan + "&ACTION=" + action;
        $http.get(url)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
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

	return{
            GetDashboardChart:GetDashboardChart,
            GetCustomerCall:GetCustomerCall
		}
});