module.exports = function (express, app, path) {

	app.use(express.static(path.join(__dirname, "../public")));

	app.get("/", function (req, res, next) {
			var stock = require('./stocks.js');
            var stock1 = new stock("GOOGL");
            stock1.getJSON();
    		res.render("index");
    });

   	app.get("*", function(req, res){
   		res.status(404).send("Can not find the page");
    });
}
