var socket = io.connect("http://localhost:4000");

var handle = document.getElementById("handle"),
    message = document.getElementById("message"),
    btn = document.getElementById("send"),
    output = document.getElementById("output")
feedback = document.getElementById("feedback");

btn.addEventListener("click", () => {
    if (handle.value == "" || handle.value == null) {
        alert("Enter handle first");
    } else {
        socket.emit("chat", {
            message: message.value,
            handle: handle.value
        });
        message.value = ""
    }
});

message.addEventListener("keypress", () => {
    socket.emit('typing', {
        handle: handle.value
    });
});

message.addEventListener("focusout", () => {
    socket.emit('focusout', {
        handle: handle.value
    });
});

socket.on("chat", (data) => {
    output.innerHTML += '<p><strong>' + data.handle + '</strong> :' + data.message + '</p>';
    feedback.innerHTML = "";
});

socket.on("typing", (data) => {
    feedback.innerHTML = '<p><em>' + data.handle + ' : is typing</em></p>';
});

socket.on("focusout", (data) => {
    feedback.innerHTML = '';
});