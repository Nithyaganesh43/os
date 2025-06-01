const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
});

server.on('message', (msg, rinfo) => {
    console.log(`Received: ${msg.toString()}`);
    const capitalizedSentence = msg.toString().toUpperCase();
    server.send(capitalizedSentence, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error('Error sending response:', err);
        }
    });
});

server.bind(9876);
