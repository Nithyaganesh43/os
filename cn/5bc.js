const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter message: ', (message) => { 
    client.send(message, 9876, 'localhost');
});

client.on('message', (msg, rinfo) => {
    console.log(`FROM SERVER: ${msg.toString()}`);
    client.close();
    rl.close();
});
