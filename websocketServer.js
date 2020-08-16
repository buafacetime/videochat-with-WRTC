const wss = require("socket.io")(8080);

wss.on('connect', socket => {



    socket.on('WRTC_SDP_EXCHANGE', (message) => {

        socket.broadcast.emit('SDP_DATA', message);
    });

    socket.on('INITI_ROOM_OR_JOIN_ROOM', (roomName) => {

        let weirdObject = wss.sockets.clients();

        let numOfClientsInRoom = weirdObject.adapter.rooms[roomName] === undefined ?
            (0) : (weirdObject.adapter.rooms[roomName].length);

        switch (numOfClientsInRoom) {
            case 0:
                socket.emit('ROOM_IS_EMPTY', roomName)
                socket.join(roomName);
                wss.sockets.in(roomName).emit('ENTER_ROOM', roomName);
                break
            case 1:
                socket.join(roomName);
                // socket.emit('joined', roomName);
                wss.sockets.in(roomName).emit('ENTER_ROOM', roomName);
            default:
                socket.emit('ROOM_IS_FULL', roomName);
                break
        }

    });
});

console.log('websocket server listening at ws://localhost:8080')
