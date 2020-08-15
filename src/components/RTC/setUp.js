"user strict";
import Signaling from "./signaling.js";
import {
   stunServers,
   turnServers 
} from "./servers/RTCServers.js";

class RTCSETUP extends Signaling {
    constructor(){
        super();
        this.peer = new RTCPeerConnection({
            iceServers:[
                ...stunServers(),
                ...turnServers()
            ]
        });
 
    }

    /**
     * @description adds relevent event listeners needed
     *  by both peers.
     */
    setUpEvents (){

          this.peer.addEventListener('icecandidate', event => {
            try{
                   if(event.candidate) this.send({candidate: event.candidate});
            }catch (err) {
                console.log(`failed to add ICE Candidate: ${err.toString()}`);
            }
          });

          this.peer.addEventListener('track', event => this.gotRemoteStream(event));

          this.onmessage(async ({desc, candidate}) => {
              try{
                  if(desc){

                  }else if (candidate){
                      al
                  }

              }catch (err) {
                console.error(err.toString())
              }
          })
    }
}

export default RTCSETUP;