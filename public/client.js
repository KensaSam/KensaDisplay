/*/ Socket.IO connection
const socket = io();
socket.on('connect', () => {
    console.log('Client.js Connected to server');
});


socket.on('disconnect', () => {
    console.log('Disconnected from server');
});