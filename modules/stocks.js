module.exports = function (stockCode) {
    this.code = stockCode;
    this.googleFinance = require('google-finance');

    this.getJSON = function () {
		// https://github.com/pilwon/node-google-finance/blob/master/README.md
		this.googleFinance.historical({
          symbol: this.code,
          from: "2017-01-01",
          to: "2017-10-20"
        }, function (err, quotes) {
        	if(err){
        		console.log("Error getting stock data");
        	} else {
        		console.log(quotes);
        	}
        });
    }
}