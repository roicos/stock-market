module.exports = {

    getJSON : function (symbols, callback) {
		const q = require('q');
		const googleFinance = require('google-finance');
		var deferred = q.defer();

		var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var twoYearsAgo = new Date(year - 2, month, day);

        if(symbols.length == 0){
        	var data = {};
        	deferred.resolve(data);
        } else {
        	googleFinance.historical({
			  symbols: symbols,
			  from: twoYearsAgo,
			}, function (error, result) {
				if(error){
					deferred.reject("Error getting stock data for: " + symbols);
				} else {
					var data = {};
					for(var key in result){
						if(result[key].length == 0){
							deferred.reject("Error getting stock data for: " + symbols);
						} else {
							var startValue = result[key][0].close;
							for(var i=0; i<result[key].length; i++){
								if(data[result[key][i].date] == undefined){
									data[result[key][i].date] = {};
								}
								var value = (result[key][i].close/startValue)*100;
								data[result[key][i].date][key] = value;
							}
						}
					}
					deferred.resolve(data);
				}
			});
        }

		deferred.promise.nodeify(callback);
        return deferred.promise;
    }
}