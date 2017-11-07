module.exports = {

    getJSON : function (code, callback) {
		// https://github.com/pilwon/node-google-finance/blob/master/README.md
		const q = require('q');
		const googleFinance = require('google-finance');
		var deferred = q.defer();

		googleFinance.historical({
          symbol: code,
          from: undefined,
          to: "2017-10-20"
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