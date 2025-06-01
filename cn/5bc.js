const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter message: ', (message) => {
    const serverPort = 9876;
    const serverAddress = 'localhost';

    client.send(message, serverPort, serverAddress, (err) => {
        if (err) {
            console.error('Error sending message:', err);
            client.close();
            rl.close();
        }
    });
});

client.on('message', (msg, rinfo) => {
    console.log(`FROM SERVER: ${msg.toString()}`);
    client.close();
    rl.close();
});
