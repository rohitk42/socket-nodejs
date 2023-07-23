var socket = io();

var userName = "";

var messageUI = document.getElementById("message");
var userMessage = document.getElementById("userMessage");
var userMessageForm = document.getElementById("userMessageForm");

// getting name from the user in input box
var userNameInput = document.getElementById("userName");
var showUserName = document.getElementById("showUserName");
var userNameForm = document.getElementById("userNameForm");


// getting room name from the user in input box
var roomNameInput = document.getElementById("roomName");
var showRoomName = document.getElementById("showRoomName");
var roomForm = document.getElementById("roomForm");

// user entering their name
userNameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    userName = userNameInput.value;

    console.log('userName => ', userName);

    showUserName.innerHTML = "userName : " + userName;
    // make the name input form hidden
    userNameForm.hidden = true;
    

    // roomname also visible
    roomForm.hidden = false;

    
});


// user entering their room name
roomForm.addEventListener('submit', function(e) {
    e.preventDefault();
    roomName = roomNameInput.value;

    showRoomName.innerHTML = "roomName : " + roomName;
    // make the name input form hidden
    roomForm.hidden = true;

    // make the message input form visible
    userMessageForm.hidden = false;
    messageUI.hidden = false;

    // sending data to user_chat event
    socket.emit('client_room_name', { roomName });

    // sending data to user_chat event
    socket.emit('user_chat', { userName });
});

userMessageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    msg = userMessage.value

    // sending the same message to server with userName
    var newMessageObj = {
        userName,
        msg
    };

    console.log('send to server...', newMessageObj);

    socket.emit('chat_message', newMessageObj);

    });

socket.on('chat_message', (val) => {
    console.log('from server:', val);
    listIterm = document.createElement('li');
    listIterm.innerHTML = val;
    messageUI.appendChild(listIterm)
});
