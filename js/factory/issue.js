angular.module('starter')
.factory('IssueFac',function($http,$q,$window,UtilService)
{
	var GetIssue = function(tanggalstart,tanggalend)
	{
		var globalurl 	= UtilService.ApiUrl();
		var deferred 	= $q.defer();
		var url 		= globalurl + "chart/esmsalesmdmemos/search?TGLSTART=" + tanggalstart +"&TGLEND=" + tanggalend;
		var method 		= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
		  	deferred.resolve(response.Salesmemo);
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
			GetIssue:GetIssue
		}
});