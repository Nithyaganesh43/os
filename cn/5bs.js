const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
});

server.on('message', (msg, rinfo) => {
    console.log(`Received: ${msg.toString()}`);
    server.send(msg.toString(), rinfo.port, rinfo.address);
});

server.bind(9876);
