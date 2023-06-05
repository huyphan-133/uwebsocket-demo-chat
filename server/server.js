// npm install uNetworking/uWebSockets.js#v16.2.0
const uWS = require('uWebSockets.js');
// uWebSockets.js is binary by default
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const redis = require('redis');

const publisher = redis.createClient();
publisher.connect();

const subscriber = publisher.duplicate();
subscriber.connect();
subscriber.subscribe('message', sData => {
    let data = JSON.parse(sData)
    app.publish(data.room, data.message);
})

const app = uWS.App().ws('/*', {
    open: (socket, req) => {
        /* For now we only have one canvas */
        console.log('Have new client!')
        socket.subscribe("chat/room1");
    },
    message: (socket, message, isBinary) => {
        let sMessage = decoder.write(Buffer.from(message))
        console.log("Receive message: " + sMessage);
        publisher.publish('message', JSON.stringify({ room: "chat/room1", message: sMessage }));
    }
});

const port = parseInt(process.argv[2]);
app.listen(port, (listenSocket) => {
    if (listenSocket) {
        console.log('Listening to port %s', port);
    }
});