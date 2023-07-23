const express = require('express');
const path = require('path');
const { socketHandler } = require('./handler');
const app = express();

// create socket for server
const http = require('http').Server(app);
const io = require('socket.io')(http); 

// send index.html to browser
app.get('/index', (req, res) => {
    const filePath = path.join(__dirname, './index.html');
    return res.sendFile(filePath);
});

// send index.html to browser
app.get('/script.js', (req, res) => {
    const filePath = path.join(__dirname, './script.js');
    return res.sendFile(filePath);
});


io.on('connection', (socket) => {
    socketHandler(io, socket);
});

const PORT = 3000;
http.listen(PORT, () => {
    console.log(`server is running...${PORT}`);
});
