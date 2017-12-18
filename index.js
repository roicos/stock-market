const http = require("http");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set('port', (process.env.PORT || 5000));


// Static files
const fs = require("fs");
const path = require("path");

// Post request parser, sould be before routing
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  	extended: true
}));

// OTHER MODULES
const modulesDir = "./modules"
var stock = require(modulesDir + '/stock');

// Global codes
var symbols = ["GOOGL"];

// START THE APP
const server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Web sockets
const SocketServer = require('ws').Server;
const wss = new SocketServer({server: server});

wss.on('connection', function(ws){
  console.log('Client connected');
  ws.on('close', function(){console.log('Client disconnected')});
});

// Routing
require(modulesDir + "/routes")(express, app, wss, path, stock, symbols);


