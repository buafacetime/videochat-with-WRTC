const WSS = require('websocket').server;
const { httpServer } = require('./httpServer');
const { wsHandler } = require('./webSocketsFuncs');

// setting up webscoket server.
const wsServer = new WSS({ httpServer });

wsServer.on('request', wsHandler);
