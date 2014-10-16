var nodeJsSocket = require("nodejs-websocket");
var socketServer = nodeJsSocket.createServer(function(con){
    con.on("text",function(msg){
        socketServer.connections.forEach(function(c){
            c.sendText(msg);
        });
    });
});
socketServer.listen("9090");
console.log("Chat server is listening on port 9090");
