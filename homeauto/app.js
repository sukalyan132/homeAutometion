var WebSocketServer = require('websocket').server;
var http = require('http');
var clients = [];
var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
	//console.log(request);
  var connection = request.accept(null, request.origin);
  clients.push(connection);
  // This is the most important callback for us, we'll handle
  // all messages from users here.
  //connection.on('message', wsServer.broadcast);
  connection.on('message', function(message) {
  	//console.log(message);
    if (message.type === 'utf8') {
      // process WebSocket message
      //connection.send(message.utf8Data);
      clients.forEach(function(client) {
          if(message.utf8Data=='Info to be echoed back')
          {

          }
          else
          {
            //wsServer.broadcast(message.utf8Data);
            client.send(message.utf8Data);
          }

      });
           

    }
  });

  
});
