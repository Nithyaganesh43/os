const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.connect(4550, '127.0.0.1', () => {
    console.log('Connection Established');
    rl.question('Enter the data: ', (input) => {
        client.write(input);
    });
});

client.on('data', (data) => {
    console.log('FROM SERVER:', data.toString());
    console.log('Echo Received');
    client.end();
    rl.close();
});

client.on('close', () => {
    console.log('Connection closed');
});
