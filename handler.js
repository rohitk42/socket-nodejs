
function socketHandler (io, socket) {
    // scope of variable is unique to each client
    let userName = '';
    let roomName = '';
    
    console.log('when client starts the connection');
    
    socket.on('user_chat', (data) => {
        userName = data.userName;
        const msg = `${userName} has joined the chat`;
        io.to(roomName).emit("chat_message", msg)
    });

    socket.on('client_room_name', (data) => {
        roomName = data.roomName;
        console.log(" roomName => ", roomName);

        socket.join(roomName);
    });

    socket.on('chat_message', (newMessageObj) => {
        console.log('message from client:');
        const user = newMessageObj.userName;

        const message = `${user} : ${newMessageObj.msg}`;
        
        io.to(roomName).emit("chat_message", message)
    });

    socket.on('disconnect', () => {
        const message = `${userName} has left the chat`;
        io.to(roomName).emit("chat_message", message);
        console.log(message);
    });

}

 module.exports = { socketHandler };