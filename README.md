# arduino-websocket
Connect Arduino to a web app through a websocket using node.js.


The Arduino board send a signal throguh the serial port. The web app server connects to the serial port and send the signal to the web page using a websocket channel.

![model](/model/model_bb.png)

Installing
----------
```npm install```

Running
-------
```node app.js <serial_port>```

Full article at http://blog.werneckpaiva.com.br/2016/01/como-integrar-arduino-com-app-web-usando-websockets/
