"use strict";
import io from 'socket.io-client';

/**
 * @description websocket signaling server used to
 * exchange session descriptions before peers can
 * use wrtc in the browser.
 */
class Signaling {
    wss = io('http://localhost:3000/');
    
    constructor(room) {
        this.room = room;
        this.wss.emit('INITI_ROOM_OR_JOIN_ROOM', this.room);

        this.wss.on('ROOM_IS_FULL', () => {
            window.startVideoChat ("chat room is full, start chat");
            // display an alert on UI/UX that room requested is currently 
            // occupied
        });

        this.wss.on('LEAVEROOM', () => {
            if( window.leftRoom !== true) {
                console.log("leave room");
                window.leaveChatRoom(); 
                window.videoCallEnded();
            }
            
        });
  
    }
    /**
     * 
     * @param {Function} listener 
     * @description sets listener to on wrtcdataexchange Event
     */
    onmessage(listener) {
        this.wss.on('SDP_DATA', listener);
    }
    /**
     * 
     * @param {Objet} dataObject 
     * @description sends data to socket server.
     */
    send(dataObject) {
        this.wss.emit('WRTC_SDP_EXCHANGE', dataObject)
    }
}

export default Signaling;