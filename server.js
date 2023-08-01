'use strict';

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the "public" directory (include your client.js and styles.css)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'photos')));

let data_to_send = []; // Change the variable name to data_to_send

// Set the HTML page as the default route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A client connected');

    // Send the initial data_to_send to the connected client
    socket.emit('liveData', data_to_send);

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });

    // Receive data from the Python script
    socket.on('liveData', (data) => {
        //console.log('Received data from Python:', data);
        // Update the data_to_send with the received data
        data_to_send = data;
        // Emit the received data to all connected clients (including the sender)
        io.emit('liveData', data);
    });
});

// Start the server
const port = 1337; // Set your desired port number here
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});