var readlineSync = require('readline-sync');
var colors = require('colors');
var net = require('net');
var HOST = "127.0.0.1";
var PORT = "9000";
var client = null;
function openConnection() {
    if (client) {
        console.log("Connection is already open --".red);
        showMenu();
        return;
    }
    client = new net.Socket();
    client.on('error', function (err) {
        client.destroy();
        client = null;
        console.log("Error : Connection could not be opened. Msg : %s".red, err.message);
        showMenu();
    });
    client.on("data", function (data) {
        console.log("Received %s ".cyan, data);
        showMenu();
    });
    client.connect(PORT, HOST, function () {
        console.log("Connection opened successfully".green);
        showMenu();
    });
}
function sendData(data) {
    if (!client) {
        console.log("Connection is not opened or closed".red);
        showMenu();
        return;
    }
    client.write(data);
}
function closeConnection() {
    if (!client) {
        console.log("Connection is not opened or already closed".red);
        showMenu();
        return;
    }
    client.destroy();
    client = null;
    console.log("Connection closed successfully!".yellow);
    showMenu();
}
function menu() {
    var lineRead = readlineSync.question('\n \n Enter Option (1 - Open, 2 -Send, 3 -Close, 4 -Quit) : ');
    switch (lineRead) {
        case "1":
            openConnection();
            break;
        case "2":
            var data = readlineSync.question("Enter Data to send : ")
            sendData(data);
            break;
        case "3":
            closeConnection();
            break;
        case "4":
            closeConnection();
            break;
        default:
            showMenu();
            break;
    }
}
function showMenu() {
    setTimeout(function () {
        menu();
    }, 0);
}
showMenu();
