var express = require('express');
var http = require("http")
var app = express();
app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(5000, function(){
    console.log('App running on port 3000!');
})

var WebSocketServer = require("ws").Server
var wss = new WebSocketServer({server: server})

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var port = process.argv[2];
var serialport = new SerialPort(port, {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

serialport.on('data', function(data){
    var value = ""
    for (p in data) value += data[p];
    wss.clients.forEach(function each(ws) {
      ws.send(JSON.stringify(value), function() {  })
    });
});
