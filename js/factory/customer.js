angular.module('starter')
.factory('CustomerFac',function($http,$q,$window,UtilService,StorageService)
{
	var GetGroupCustomers = function()
	{
		var globalurl 	= UtilService.ApiUrl();
		var deferred 	= $q.defer();
		var url 		= globalurl + "master/customergroups";
		var method 		= "GET";
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
	var GetSingleGroupCustomer = function(groupcustomer)
	{
		var globalurl 	= UtilService.ApiUrl();
		var deferred 	= $q.defer();
		var url 		= globalurl + "master/customers/search?SCDL_GROUP="+ groupcustomer;
		var method 		= "GET";
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
	var GetCustomers = function()
	{
		var globalurl 	= UtilService.ApiUrl();
		var deferred 	= $q.defer();
		var url 		= globalurl + "master/customers/search?STATUS=1";
		var method 		= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
		  	deferred.resolve(response.Customer);
        })
        .error(function()
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

	var GetSingleCustomer = function(idcustomer)
	{
		var globalurl 	= UtilService.ApiUrl();
		var deferred 	= $q.defer();
		var url 		= globalurl + "master/customers/"+ idcustomer;
		var method 		= "GET";
		$http({method:method, url:url,cache:false})
        .success(function(response) 
        {
		  	deferred.resolve(response);
        })
        .error(function()
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
    var GetLastCustomers = function()
    {
        var globalurl   = UtilService.ApiUrl();
        var deferred    = $q.defer();
        var url         = globalurl + "master/customerlasts";
        var method      = "GET";
        $http({method:method, url:url,cache:false})
        .success(function(response) 
        {
            deferred.resolve(response.Customer);
        })
        .error(function()
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

    var GetNooCustomers = function()
    {
        var globalurl   = UtilService.ApiUrl();
        var deferred    = $q.defer();
        var url         = globalurl + "master/customers/search?CUST_GRP=CUS.2016.000637";
        var method      = "GET";
        $http({method:method, url:url,cache:false})
        .success(function(response) 
        {
            deferred.resolve(response.Customer);
        })
        .error(function()
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
    var GetNooCustomersBySales = function(users)
    {
        var globalurl   = UtilService.ApiUrl();
        var deferred    = $q.defer();
        var url         = globalurl + "master/customers/search?CUST_GRP=CUS.2016.000637&CREATED_BY=" + users;
        var method      = "GET";
        $http({method:method, url:url,cache:false})
        .success(function(response) 
        {
            deferred.resolve(response.Customer);
        })
        .error(function()
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
    var SetCustomers = function(detail)
    {
        var deferred            = $q.defer();
        var globalurl           = UtilService.ApiUrl();

        var result              = UtilService.SerializeObject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(globalurl + "master/customers",serialized,config)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
        })
        .error(function(err)
        {
            deferred.reject(err);
        });
        
        return deferred.promise;
    }

    var UpdateCustomers = function(detail)
    {
        var deferred            = $q.defer();
        var globalurl           = UtilService.ApiUrl();
        var CUST_ID             = detail.CUST_KD;
        var result              = UtilService.SerializeObject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.put(globalurl + "master/customers/" + CUST_ID,serialized,config)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
        })
        .error(function(err)
        {
            deferred.reject(err);
        });
        
        return deferred.promise;
    }

    var SetCustomersBerkas = function(detail)
    {
        var deferred            = $q.defer();
        var globalurl           = UtilService.ApiUrl();

        var result              = UtilService.SerializeObject(detail);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(globalurl + "master/customerberkas",serialized,config)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data);
        })
        .error(function(err)
        {
            deferred.reject(err);
        });
        
        return deferred.promise;
    }

    var GetCustomersBerkas = function(CUST_KD)
    {
        var globalurl   = UtilService.ApiUrl();
        var deferred    = $q.defer();
        var url         = globalurl + "master/customerberkas?CUST_KD=" + CUST_KD;
        var method      = "GET";
        $http({method:method, url:url,cache:false})
        .success(function(response) 
        {
            if(angular.isDefined(response.statusCode))
            {
                deferred.resolve([]);
            }
            else
            {
               deferred.resolve(response.CustomerBerkas); 
            }
            
        })
        .error(function()
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
    var SearchCustomersBerkas = function(CUST_KD)
    {
        var globalurl   = UtilService.ApiUrl();
        var deferred    = $q.defer();
        var url         = globalurl + "master/customerberkas/search?CUST_KD=" + CUST_KD;
        var method      = "GET";
        $http({method:method, url:url,cache:false})
        .success(function(response) 
        {
            if(angular.isDefined(response.statusCode))
            {
                deferred.resolve([]);
            }
            else
            {
               deferred.resolve(response.CustomerBerkas); 
            }
            
        })
        .error(function()
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
			GetGroupCustomers:GetGroupCustomers,
			GetSingleCustomer:GetSingleCustomer,
			GetSingleGroupCustomer:GetSingleGroupCustomer,
			GetCustomers:GetCustomers,
            GetLastCustomers:GetLastCustomers,
            GetNooCustomers:GetNooCustomers,
            GetNooCustomersBySales:GetNooCustomersBySales,
            SetCustomers:SetCustomers,
            UpdateCustomers:UpdateCustomers,
            SetCustomersBerkas:SetCustomersBerkas,
            GetCustomersBerkas:GetCustomersBerkas,
            SearchCustomersBerkas:SearchCustomersBerkas
		}
});