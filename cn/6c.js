const net = require('net');
const readline = require('readline');

const client = new net.Socket();
client.connect(3128, 'localhost', () => {
    console.log('Connected to server');
});

client.on('data', (data) => {
    console.log('Msg from server:', data.toString());
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    client.write(input);
});

client.on('close', () => {
    console.log('Connection closed');
    rl.close();
});
