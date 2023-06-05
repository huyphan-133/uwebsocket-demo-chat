// npm install uNetworking/uWebSockets.js#v16.2.0
const uWS = require('uWebSockets.js');
// uWebSockets.js is binary by default
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

const app = uWS.App().ws('/*', {
    open: (socket, req) => {
        /* For now we only have one canvas */
        socket.subscribe("chat/room1");
    },
    message: (socket, message, isBinary) => {
        let sMessage = decoder.write(Buffer.from(message))
        console.log("Receive message: " + sMessage);
        app.publish("chat/room1", sMessage);
    }
});

const port = 8080
app.listen(port, (listenSocket) => {
    if (listenSocket) {
        console.log('Listening to port %s', port);
    }
});