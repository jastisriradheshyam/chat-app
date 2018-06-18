// socket connection with server
var socket = io.connect("http://localhost:4000");

// getting elements by their id for future operation on them
var handle = document.getElementById("handle"),
    message = document.getElementById("message"),
    btn = document.getElementById("send"),
    output = document.getElementById("output"),
    feedback = document.getElementById("feedback");

// Event listen for click on a button
btn.addEventListener("click", () => {
    // Check if handle is not empty before sending data.
    if (handle.value == "" || handle.value == null) {
        alert("Enter handle first");
    } else {
        socket.emit("chat", {
            message: message.value,
            handle: handle.value
        });
        // Reset the message field after sending the data
        message.value = ""
    }
});

// Event for keypress for showing the typing message to others
message.addEventListener("keypress", () => {
    socket.emit('typing', {
        handle: handle.value
    });
});

// Event for focus out.
message.addEventListener("focusout", () => {
    socket.emit('focusout', {
        handle: handle.value
    });
});

// listen socket with "chat".
socket.on("chat", (data) => {
    output.innerHTML += '<p><strong>' + data.handle + '</strong> :' + data.message + '</p>';
    feedback.innerHTML = "";
});

// listen socket with "typing" to show typing by other user
socket.on("typing", (data) => {
    feedback.innerHTML = '<p><em>' + data.handle + ' : is typing</em></p>';
});

// listen socket with "focusout" to remove the typing message.
socket.on("focusout", (data) => {
    feedback.innerHTML = '';
});
