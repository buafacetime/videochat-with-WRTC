const port = process.env.PORT || 3000,
    wss = require("socket.io")(port);

wss.origins(['http://localhost:8080']);

wss.on('connect', socket => {

    socket.on('ENDVIDEOCHAT', roomName => socket.leave(roomName));

    socket.on('WRTC_SDP_EXCHANGE', (message) => {

        socket.broadcast.emit('SDP_DATA', message);
    });

    socket.on('INITI_ROOM_OR_JOIN_ROOM', (roomName) => {

        let weirdObject = wss.sockets.clients();

        let numOfClientsInRoom = weirdObject.adapter.rooms[roomName] === undefined ?
            (0) : (weirdObject.adapter.rooms[roomName].length);

        switch (numOfClientsInRoom) {
            case 0:
                socket.join(roomName);
                break
            case 1:
                socket.join(roomName);
                socket.broadcast.emit("ROOM_IS_FULL");
        }

    });
});

console.log(`websocket server listening at ws://localhost:${port}`);
