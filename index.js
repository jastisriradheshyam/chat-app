// importing libraries / packages
var express = require('express')
var socket = require('socket.io')

var app = express();

// Creating server
var server = app.listen(4000, () => {
    console.log("Server Started on PORT 4000");
});

// Using static path
app.use(express.static("public"));

// Socket
var io = socket(server);

// Socket connection
io.on("connection", (socket) => {
    console.log("connection made", socket.id);
    // for chat
    socket.on("chat", (data) => {
        console.log(data);
        // check for the handle not being empty when data is sent
        if (data.handle == "" || data.handle == null) {
        } else {
            io.sockets.emit("chat", data);
        }
    });
    // for typing
    socket.on("typing", (typing_data) => {
        console.log(typing_data);
        socket.broadcast.emit("typing", typing_data);
    });
    // for removing typing when pointer focus out.
    socket.on("focusout", (data) => {
        console.log(data);
        socket.broadcast.emit("focusout", data);
    });
})
