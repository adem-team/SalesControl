angular.module('starter')
.factory('PromoFac',function($http,$q,$window,UtilService)
{
	var GetPromos = function(statuspromo)
    {
		var globalurl 		= UtilService.ApiUrl();
		var deferred 		= $q.defer();
		var getUrl 			= UtilService.ApiUrl();
		var url 			= getUrl + "chart/promos/search?STATUS=" + statuspromo;
		var method 			= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
	        if(angular.isDefined(response.statusCode))
	        {
	        	deferred.resolve([]);
	        }
	        else
	        {
	        	deferred.resolve(response.Promo);
	        }
	        
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
			GetPromos:GetPromos
		}
});