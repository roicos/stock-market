const http = require("http");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set('port', (process.env.PORT || 5000));


// static files
const fs = require("fs");
const path = require("path");

// post request parser, sould be before routing
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  	extended: true
}));

// OTHER MODULES
const modulesDir = "./modules"
var stock = require(modulesDir + '/stock');

// Global codes
var codes = ["GOOGL", "AMZN", "AAPL"];

// routing
require(modulesDir + "/routes")(express, app, path, stock, codes);

// START THE APP
const server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

const SocketServer = require('ws').Server;
const wss = new SocketServer({server: server});

wss.on('connection', function(ws){
  console.log('Client connected');
  ws.on('close', function(){console.log('Client disconnected')});
});

// brodcast events
/*setInterval(function(){
  wss.clients.forEach(function(client) {
    client.send(new Date().toTimeString());
  });
}, 5000);*/


