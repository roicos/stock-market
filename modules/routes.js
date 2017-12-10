module.exports = function (express, app, path, stock, symbols) {

	app.use(express.static(path.join(__dirname, "../public")));

	app.get("/", function (req, res, next) {
		stock.getJSON(symbols, function (error, result) {
			if(error){
				console.log(error);
				res.render("index", {"symbols" : [], "data" : []});
			} else {
				var data = {};
				for(var key in result){
					var startValue = result[key][0].close;
					for(var i=0; i<result[key].length; i++){
						if(data[result[key][i].date] == undefined){
							data[result[key][i].date] = {};
						}
						var value = (result[key][i].close/startValue)*100;
						data[result[key][i].date][key] = value;
					}
				}
				res.render("index", {"symbols" : symbols, "data" : data});
			}
		});
    });

    app.post("/addStock", function(req, res, next){
    	var symbol = req.body.symbol.trim().toUpperCase();
    	/*stock.getJSON(symbol, function (error, result) {
			if(error){
				console.log(error);
				res.render("index", {"symbols" : [], "data" : []});
			} else {
				for(var key in result){
				}
				res.render("index", {"symbols" : symbols, "data" : data});
			}
		});*/
    	if(symbols.indexOf(symbol) == -1){
    		symbols.push(symbol);
    	}
		res.redirect("/");
    });

    app.post("/removeStock", function(req, res, next){
    	var newSymbols = [];
    	for(var i=0; i<symbols.length; i++){
    		if(symbols[i] != req.body.symbol){
    			newSymbols.push(symbols[i]);
    		}
    	}
    	symbols = newSymbols;
    	newSymbols = undefined;
    	res.redirect("/");
    });

   	app.get("*", function(req, res){
   		res.status(404).send("Can not find the page");
    });
}
