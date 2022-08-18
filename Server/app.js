var net = require('net');
var colors = require('colors');
var server = net.createServer();
server.on("connection", function (socket) {
    var remoteAddress = socket.remoteAddress + " : " + socket.remotePort;
    console.log("new client connection is made %s".green, remoteAddress);
    socket.on('data', function (d) {
        console.log("Data  from %s : %s", remoteAddress, d);
        socket.write('data ' + d);
    })
    socket.once("close", function () {
        console.log("Connection from %s closed successfully".yellow, remoteAddress);
    })
    socket.on("error", function (err) {
        console.log("Connection %s err :  %s",remoteAddress,  err.message);
    })
});
server.listen(9000, function () {
    console.log("Server listening to %j".yellow, server.address());
});
