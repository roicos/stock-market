module.exports = function (express, app, wss, path, stock, symbols) {

	app.use(express.static(path.join(__dirname, "../public")));

	app.get("/", function (req, res, next) {
		stock.getJSON(symbols, function (error, result) {
			if(error){
				console.log(error);
				res.render("index", {"symbols" : [], "data" : []});
			} else {
				res.render("index", {"symbols" : symbols, "data" : result});
			}
		});
    });

    app.post("/addStock", function(req, res, next){
    	var symbol = req.body.symbol.trim().toUpperCase();

    	if(symbols.indexOf(symbol) == -1){
    		symbols.push(symbol);
    	}

    	stock.getJSON(symbols, function (error, result) {
			if(error){
				// remove incorrect symbol back from the array
				if(symbols.indexOf(symbol) > -1){
					symbols.splice(symbols.indexOf(symbol), 1);
				}
				res.status(500).send("Error to add stack: " + symbol + ", " + error);
			} else {
				wss.clients.forEach(function(client) {
				   // console.log("broadcast notification");
				   client.send(JSON.stringify({"symbols" : symbols, "data" : result}));
				});
				res.status(200).send("OK");
			}
		});
    });

    app.post("/removeStock", function(req, res, next){
    	var symbol = req.body.symbol.trim().toUpperCase();

    	var newSymbols = [];
    	for(var i=0; i<symbols.length; i++){
    		if(symbols[i] != symbol){
    			newSymbols.push(symbols[i]);
    		}
    	}
    	symbols = newSymbols;
    	newSymbols = undefined;

    	stock.getJSON(symbols, function (error, result) {
			if(error){
				res.status(500).send("Error to remove stack: " + symbol + ", " + error);
			} else {
				console.log("broadcast notifications");
				wss.clients.forEach(function(client) {
				   client.send(JSON.stringify({"symbols" : symbols, "data" : result}));
				});
				res.status(200).send("OK");
			}
		});
    });

   	app.get("*", function(req, res){
   		res.status(404).send("Can not find the page");
    });
}
