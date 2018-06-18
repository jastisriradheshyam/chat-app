var express = require('express')
var socket = require('socket.io')

var app = express();

var server = app.listen(4000, () => {
    console.log("Server Started on PORT 4000");
});

app.use(express.static("public"));

var io = socket(server);

io.on("connection", (socket) => {
    console.log("connection made", socket.id);
    socket.on("chat", (data) => {
        console.log(data);
        if (data.handle == "" || data.handle == null) {
        } else {
            io.sockets.emit("chat", data);
        }
    });
    socket.on("typing", (typing_data) => {
        console.log(typing_data);
        socket.broadcast.emit("typing", typing_data);
    });
    socket.on("focusout", (data) => {
        console.log(data);
        socket.broadcast.emit("focusout", data);
    });
})