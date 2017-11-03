module.exports = function (express, app, path, stock, codes) {

	app.use(express.static(path.join(__dirname, "../public")));

	app.get("/", function (req, res, next) {
		for(var i=0; i<codes.length; i++){
			stock.getJSON(codes[i], function (error, result) {
				if(error){
					console.log(error);
				} else {
					console.log(result);
				}
			});
		}
		res.render("index", {"data" : codes});
    });

    app.post("/addStock", function(req, res, next){
		codes.push(req.body.code.trim().toUpperCase());
		res.redirect("/");
    });

    app.post("/removeStock", function(req, res, next){
    	var newCodes = [];
    	for(var i=0; i<codes.length; i++){
    		if(codes[i] != req.body.code){
    			newCodes.push(codes[i]);
    		}
    	}
    	codes = newCodes;
    	newCodes = undefined;
    	res.redirect("/");
    });

   	app.get("*", function(req, res){
   		res.status(404).send("Can not find the page");
    });
}
