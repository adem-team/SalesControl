angular.module('starter')
.factory('SalesTrackFac',function($http,$q,$filter,UtilService)
{
    var GetSalesTracksByDate = function(tanggalplan)
    {
        var getUrl          = UtilService.ApiUrl();
        var deferred        = $q.defer();
        var url             = getUrl + "master/salestracks/search?TGL=" + tanggalplan
        $http.get(url)
        .success(function(data,status,headers,config) 
        {
            var salestracks   = [];
            _.each(data['Sales Track'], function(executes) 
            {
                var salestrack = {};
                salestrack.USER_ID = executes.USER_ID;
                salestrack.salesman = executes.NM_FIRST;
                if(executes.CHECKIN_TIME == null && executes.CHECKOUT_TIME == null)
                {
                    salestrack.CHECKIN_TIME     = "BLM KUNJUNGAN";
                    salestrack.CUST_KD          = "BLM KUNJUNGAN";
                    salestrack.CUST_NM          = "BLM KUNJUNGAN";
                    salestrack.CHECKOUT_TIME    = "BLM KUNJUNGAN";
                }
                else
                {
                    if(executes.CHECKOUT_TIME == null)
                    {
                        salestrack.CHECKOUT_TIME    = "BLM CHECK OUT";
                    }
                    else
                    {
                       salestrack.CHECKOUT_TIME     = executes.CHECKOUT_TIME; 
                    }
                    salestrack.CHECKIN_TIME         = executes.CHECKIN_TIME;
                    salestrack.CUST_KD              = executes.CUST_KD;
                    salestrack.CUST_NM              = executes.CUST_NM;
                    
                }
                salestracks.push(salestrack);

            });
            deferred.resolve(salestracks);
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
    var GetSalesTrack= function(tanggalplan,salesmanid)
    {
        var url         = UtilService.ApiUrl();
        var deferred    = $q.defer();

        $http.get(url + "master/salestrackperusers/search?TGL=" + tanggalplan + "&USER_ID=" + salesmanid)
        .success(function(data,status,headers,config) 
        {
            var salestracks   = [];
            _.each(data.SalesTrackPerUser, function(executes) 
            {
                var salestrack              = {};
                salestrack.ID_SCDLDETAIL    = executes.ID_SCDLDETAIL;
                salestrack.USER_ID          = executes.USER_ID;
                salestrack.salesman         = executes.NM_FIRST;
                salestrack.CUST_KD          = executes.CUST_KD;
                salestrack.CUST_NM          = executes.CUST_NM;
                if(executes.CHECKIN_TIME == null && executes.CHECKOUT_TIME == null)
                {
                    salestrack.CHECKIN_TIME     = "BLM KUNJUNGAN";
                    salestrack.CHECKOUT_TIME    = "BLM KUNJUNGAN";
                }
                else
                {
                    if(executes.CHECKOUT_TIME == null)
                    {
                        salestrack.CHECKOUT_TIME    = "BLM CHECK OUT";
                    }
                    else
                    {
                       salestrack.CHECKOUT_TIME     = executes.CHECKOUT_TIME; 
                    }
                    salestrack.CHECKIN_TIME     = executes.CHECKIN_TIME; 
                }
                salestracks.push(salestrack);
            });
            deferred.resolve(salestracks);
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
    var GetSalesTrackAbsensi = function(tanggalplan)
    {
        var url         = UtilService.ApiUrl();
        var deferred    = $q.defer();

        $http.get(url + "master/salesmanabsensis/search?TGL=" + tanggalplan)
        .success(function(data,status,headers,config) 
        {
            deferred.resolve(data.Salesmanabsensi);
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
            GetSalesTracksByDate:GetSalesTracksByDate,
            GetSalesTrack:GetSalesTrack,
            GetSalesTrackAbsensi:GetSalesTrackAbsensi
		}
});