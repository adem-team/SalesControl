angular.module('starter')
.factory('ChartsFac',function($http,$q,$window,UtilService)
{
	var GetCustomerStockCharts = function()
    {
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var getUrl 			= UtilService.ApiUrl();
		var url 			= getUrl + "chart/esmsalesstockcustomers";
		var method 			= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(response);
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

    var GetCustomerExpiredCharts = function(tahunbulan)
    {
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var getUrl 			= UtilService.ApiUrl();
		var url 			= getUrl + "chart/esmsalesexpiredcustomers?MONTH=" + tahunbulan;
		var method 			= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        deferred.resolve(response);
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
			GetCustomerStockCharts:GetCustomerStockCharts,
			GetCustomerExpiredCharts:GetCustomerExpiredCharts
		}
});