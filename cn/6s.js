const net = require('net');
const readline = require('readline');

const server = net.createServer((socket) => {
    console.log('Client Connected');
    socket.on('data', (data) => {
        console.log('Msg from client:', data.toString());
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (input) => {
        socket.write(input);
    });

    socket.on('close', () => {
        console.log('Client Disconnected');
        rl.close();
    });
});

server.listen(3128, 'localhost', () => {
    console.log('Server Started on port 3128');
});
