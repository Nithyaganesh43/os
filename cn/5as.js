const net = require('net');

const server = net.createServer((socket) => {
    console.log('Connection Established');

    socket.on('data', (data) => {
        console.log('Client said:', data.toString());
        socket.write(data.toString());
    });

    socket.on('close', () => {
        console.log('Connection closed');
    });
});

server.listen(4550, '127.0.0.1', () => {
    console.log('Server is listening on 127.0.0.1:4550');
});
