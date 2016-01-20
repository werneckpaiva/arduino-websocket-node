var express = require('express');
var WebSocketServer = require("ws").Server
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var http = require("http")

var app = express();
var port = process.env.PORT || 5000
app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

var port = process.argv[2];
var serialport = new SerialPort(port, {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

wss.on("connection", function(ws) {
  console.log("websocket connection open")

  serialport.on('data', function(data){
      var value = ""
      for (p in data) value += data[p];
      ws.send(JSON.stringify(value), function() {  })
  });

  ws.on("close", function() {
    console.log("websocket connection close")
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
