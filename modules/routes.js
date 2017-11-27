module.exports = function (express, app, path, stock, symbols) {

	app.use(express.static(path.join(__dirname, "../public")));

	app.get("/", function (req, res, next) {
		stock.getJSON(symbols, function (error, result) {
			if(error){
				console.log(error);
				res.render("index", {"symbols" : [], "data" : []});
			} else {
				console.log(result);
				res.render("index", {"symbols" : symbols, "data" : []});
			}
		});
    });

    app.post("/addStock", function(req, res, next){
    	var symbol = req.body.symbol.trim().toUpperCase();
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
    	console.log(symbols);
    	newSymbols = undefined;
    	res.redirect("/");
    });

   	app.get("*", function(req, res){
   		res.status(404).send("Can not find the page");
    });
}
