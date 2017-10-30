module.exports = function (express, app, path, bcrypt) {

	app.use(express.static(path.join(__dirname, "public")));

	app.get("/", checkAuth, function (req, res, next) {
    		res.render("index");
    });

   	app.get("*", function(req, res){
   		res.status(404).send("Can not find the page");
    });
}
