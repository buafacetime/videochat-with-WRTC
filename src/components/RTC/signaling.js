"use strict";
import io from 'socket.io-client';

/**
 * @description websocket signaling server used to
 * exchange session descriptions before peers can
 * use wrtc in the browser.
 */
class Signaling {
    wss = io('http://localhost:8080/');
    room = "bua";
    constructor() {

        this.wss.emit('create or join', this.room);

        this.wss.on('full', (room) => {
            // console.log('Room ' + room + ' is full');
        });

        this.wss.on('empty', (room) => {
            isInitiator = true;
            // console.log('Room ' + room + ' is empty');
        });

        this.wss.on('join', (room) => {
            // console.log('Making request to join room ' + room);
            // console.log('You are the initiator!');
        });

        this.wss.on('log', (array) => {
            // console.log.apply(console, array);
        });
    }
    /**
     * 
     * @param {Function} listener 
     * @description sets listener to on message Event
     */
    onmessage(listener) {
        this.wss.on('message', listener);
    }
    /**
     * 
     * @param {Objet} dataObject 
     * @description sends data to socket server.
     */
    send(dataObject) {
        this.wss.emit('message', dataObject)
    }
}

export default Signaling;