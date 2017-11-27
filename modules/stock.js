module.exports = {

    getJSON : function (codes, callback) {
		// https://github.com/pilwon/node-google-finance/blob/master/README.md
		const q = require('q');
		const googleFinance = require('google-finance');
		var deferred = q.defer();

		googleFinance.historical({
          symbols: codes,
          from: undefined,
          to: new Date()
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