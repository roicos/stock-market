module.exports = {

    getJSON : function (codes, callback) {
		// https://github.com/pilwon/node-google-finance/blob/master/README.md
		const q = require('q');
		const googleFinance = require('google-finance');
		var deferred = q.defer();

		var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var twoYearsAgo = new Date(year - 2, month, day);

		googleFinance.historical({
          symbols: codes,
          from: twoYearsAgo,
        }, function (err, quotes) {
        	if(err){
        		deferred.reject("Error getting stock data for " + code);
        	} else {
        		deferred.resolve(quotes);
        	}
        });
		deferred.promise.nodeify(callback);
        return deferred.promise;
    }
}