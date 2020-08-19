"user strict";
import Signaling from "./signaling.js";
import {
    stunServers,
    turnServers
} from "./servers/RTCServers.js";

class RTCSETUP extends Signaling {
    constructor(localVideoRef, remoteVideoRef, room = "bua") {
        super(room);
        this.peer = new RTCPeerConnection({
            iceServers: [
                ...stunServers(),
                ...turnServers()
            ]
        });

        this.localVideoRef = localVideoRef;
        this.remoteVideoRef = remoteVideoRef;

        this.setUpEvents();

    }

    async startVideoChat() {
        this.peer.addEventListener('negotiationneeded', async event => {
            try {
                let offerSDP = await this.peer.createOffer({
                    //offer constraints
                    offerToReceiveVideo: 1,
                    offerToReceiveAudio: 1
                });

                this.peer.setLocalDescription(offerSDP);

                this.send({ desc: offerSDP });

            } catch (err) {
                console.error(err.toString());
            }
        });

        let stream = await this.videoStream();

        for (let track of stream.getTracks()) this.peer.addTrack(track, stream);

    }
    stopStream() {
        [this.remoteVideoRef.current, this.localVideoRef.current].forEach(ref => {
            if (ref.srcObject !== null) {
                let tracks = ref.srcObject.getTracks();
                for (let track of tracks) {

                    track.stop();

                }
            }
        });
    }

    /**
     * @description ends local & remote stream, resets peer.
     */
    endVideoChat() {
        this.stopStream();
        this.turnOffRemoteStream();
        this.turnOffLocalStream();
        this.wss.emit('ENDVIDEOCHAT', this.room);
        window.videoCallEnded();
        this.wss.emit('LEAVEROOM');
        window.leftRoom = true;

    }

    /**
     * @description adds relevent event listeners needed
     *  by both peers.
     */
    setUpEvents() {

        this.peer.addEventListener('icecandidate', event => {
            try {
                if (event.candidate) this.send({ candidate: event.candidate });
            } catch (err) {
                console.log(`failed to add ICE Candidate: ${err.toString()}`);
            }
        });

        this.peer.addEventListener('track', event => this.addRemoteStream(event));

        this.onmessage(async ({ desc, candidate }) => {
            try {
                if (desc) {
                    switch (desc.type) {
                        case "offer":
                            this.answerToOffer(desc);
                            break
                        case "answer":
                            this.peer.setRemoteDescription(desc);
                            break
                    }

                } else if (candidate) {
                    await this.peer.addIceCandidate(candidate);
                }

            } catch (err) {
                console.error(err.toString())
            }
        });

        window.leaveChatRoom = () => {
            this.stopStream();
            this.turnOffRemoteStream();
            this.turnOffLocalStream();
            window.leftRoom = true;
        }
    }
    turnOffRemoteStream() {
        this.remoteVideoRef.current.srcObject = null;
    }
    turnOffLocalStream() {
        this.localVideoRef.current.srcObject = null;
    }
    muteAudio(bool) {
        this.remoteVideoRef.current.muted = bool;
    }
    turnOnLocalStream() {
        this.videoStream()
            .then(stream => this.addLocalStream(stream))
            .catch(err => console.error(err));
    }

    /**
     * @description gets remote video stream 
     * @returns stream object
     */
    async videoStream() {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            return stream
        }
        catch (err) {
            console.error(err.toString());
        }
    }
    playVideo(video) {
        video.addEventListener('loadedmetadata', e => {
            video.play();
        });
    }

    /**
    * @param {object} stream
    *@description adds local video stream capured to localvideo ref.
    */
    addLocalStream(stream) {

        this.playVideo(this.localVideoRef.current);
        this.localVideoRef.current.muted = true;
        this.localVideoRef.current.srcObject = stream;
    }
    /**
    * @param {Event} event
    * @description adds received video stream to remotevideo ref
    */
    addRemoteStream(event) {
        let { streams } = event;
        this.playVideo(this.remoteVideoRef.current);
        try {

            if (this.remoteVideoRef.current.srcObject !== streams[0]) {
                this.remoteVideoRef.current.srcObject = streams[0];
                // disable call button for all users in room.
            }

        } catch (err) {
            console.error(err.toString());
        }
        /**
     * 
     * @param {Object} description 
     * @description
     * 
     *  1, Gets video stream of callee, adds it to callee's this.peer.
     * 
     * 2, sets remote description with desctiption offer recived from caller.
     * 
     * 3, Creates answer, sets localDescripiton with answer description.
     * 
     * 4, sends answer description to caller
     * 
     */
    }
    async answerToOffer(desc) {
        try {
            let stream = await this.videoStream();

            for (let track of stream.getTracks()) this.peer.addTrack(track, stream);

            await this.peer.setRemoteDescription(desc);

            let answerSDP = await this.peer.createAnswer();

            await this.peer.setLocalDescription(answerSDP);

            this.send({ desc: answerSDP });


        } catch (err) {
            console.error(err.toString())
        }

    }
}

export default RTCSETUP;