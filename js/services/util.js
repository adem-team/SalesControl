angular.module('starter')
.service('UtilService', function($q, $http) 
{
    var ApiUrl = function()
    {
      return "http://api.lukisongroup.com/";
    }
    
    var ArrayChunk = function (arr, size) 
    {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) 
      {
        newArr.push(arr.slice(i, i+size));
      }
      return newArr;
    }

    var SerializeObject = function (objecttoserialize) 
    {
        var result={};
        function serializeObj(obj) 
        {
            var result = [];
            for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
            return result.join("&");
        }
        
        var serialized = serializeObj(objecttoserialize); 
        var config = 
        {
            headers : 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'   
            }
        };
        result.serialized   = serialized;
        result.config       = config;

        return result;
    }

    var SumPriceQtyWithCondition = function(items,price,qty,condition)
    {
        return items.reduce( function(a, b)
        {
            if(b[condition] == true)
            {
              if(b[price] == undefined || b[qty] == undefined)
              {
                  return a + 0;
              }
              else
              {
                  return a + (b[price] * b[qty]);
              }
            }
            else
            {
                return a + 0;
            }
            
        }, 0);
    }
    var SumPriceWithQty = function(items,price,qty)
    {
        return items.reduce( function(a, b)
        {
            if(b[price] == undefined || b[qty] == undefined)
            {
                return a + 0;
            }
            else
            {
                return a + (b[price] * b[qty]);
            }
        }, 0);
    }
    var SumJustPriceOrQty = function(items, price)
    {
        return items.reduce( function(a, b)
        {
            if(b[price] == undefined)
            {
                return a + 0;
            }
            else
            {
                return a + b[price];
            }
        }, 0);
    }
    var JarakDuaTitik = function(longitude1,latitude1,longitude2,latitude2)
    {
        var thetalong      = (longitude1 - longitude2)*(Math.PI / 180); 
        var thetalat       = (latitude1 - latitude2)*(Math.PI / 180);
        var a = 0.5 - Math.cos(thetalat)/2 + Math.cos(latitude1 * Math.PI / 180) * Math.cos(latitude2 * Math.PI / 180) * (1 - Math.cos(thetalong))/2;
        var jarak = 12742 * Math.asin(Math.sqrt(a)) * 1000;
        return jarak;
    }

    var getTotalHariDalamSebulan = function(tanggalplan)
    {
      var date    = new Date(tanggalplan);
      var year    = date.getFullYear();
      var month   = date.getMonth() + 1;
      return new Date(year,month,0).getDate(); 
    }
    var SqliteToArray = function(sqliteresult)
    {
    	var panjang = sqliteresult.rows.length;
    	var response = [];
  		for(var i=0; i < panjang; i++)
  		{
  			response.push(sqliteresult.rows.item(i));
  		}
		  return response;
    }

    var SetGambarCheckinCheckout = function(dataagenda)
    {
        var datadariagenda = dataagenda;
        var databaru = [];
        angular.forEach(datadariagenda, function(value, key) 
        {
            if(value.CHECKIN_TIME)
            {
               if(value.CHECKOUT_TIME)
               {
                  value.imagecheckout = "asset/admin/dist/img/customer.jpg";
                  value.STSCHECK_IN   = 1;
                  value.STSCHECK_OUT  = 1;
               }
               else
               {
                  value.imagecheckout = "asset/admin/dist/img/customerlogo.jpg";
                  value.STSCHECK_IN   = 1;
                  value.STSCHECK_OUT  = 0;
               }
            }
            else
            {
               if(value.CHECKOUT_TIME)
               {
                  value.imagecheckout = "asset/admin/dist/img/customer.jpg";
                  value.STSCHECK_IN   = 1;
                  value.STSCHECK_OUT  = 1;
               }
               else
               {
                  value.imagecheckout = "asset/admin/dist/img/normal.jpg";
                  value.STSCHECK_IN   = 0;
                  value.STSCHECK_OUT  = 0;
               }
            }
            databaru.push(value);
        });
        return databaru;
    }
    return {
      ArrayChunk:ArrayChunk,
      ApiUrl:ApiUrl,
      SumPriceQtyWithCondition:SumPriceQtyWithCondition,
      SerializeObject:SerializeObject,
      SumPriceWithQty:SumPriceWithQty,
      SumJustPriceOrQty:SumJustPriceOrQty,
      JarakDuaTitik:JarakDuaTitik,
      getTotalHariDalamSebulan:getTotalHariDalamSebulan,
      SqliteToArray:SqliteToArray,
      SetGambarCheckinCheckout:SetGambarCheckinCheckout
    };
});