import React, { useState,useEffect, useRef } from 'react';
import camera from "../../svg/switch_cameras.svg"
import screenOff from "../../svg/screen_off.svg"
import screenOn from "../../svg/screen_on.svg"
import audioOn from "../../svg/audio_on.svg"
import audioOff from "../../svg/mute_audio.svg"
import endCall from "../../svg/call_ended.svg"
import callEnded from "../../svg/end_call.svg"

const VideoChatRoom = () => {
    
    const [state, setState] = useState({
        switchcamera: {
            ref: useRef(null), boolean: true, off: camera, on: camera, task(bool) {
                switch (bool) {
                    case true:
                        console.log("camera switched")
                        break
                    case false:
                        console.log("camera not switched")
                        break
                }
            }
        },
        screen: {
            ref: useRef(null), boolean: true, off: screenOff, on: screenOn, task(bool) {
                switch (bool) {
                    case true:
                        console.log("screen turned off")
                        break
                    case false:
                        console.log("screen turned on")
                        break
                }
            }
        },
        audio: {
            ref: useRef(null), boolean: true, off: audioOff, on: audioOn, task(bool) {
                switch (bool) {
                    case true:
                        console.log("audio turned off")
                        break
                    case false:
                        console.log("audio turned on")
                        break
                }
            }
        },
        endcall: {
            ref: useRef(null), boolean: true, off: callEnded, on: endCall, task(bool) {
                switch (bool) {
                    case true:
                        console.log("call ended")
                        break
                    case false:
                        console.log("call not ended")
                        break
                }
            }
        }
    }), {
        switchcamera,
        screen,
        audio,
        endcall
    } = state,
        /**
         * @param {object} object
         * @description Changes source of img clicked and
         *  invokes task method on object param passed in.
         */
        InvokeProcedure = (object) => {

            object.boolean === true ?
                (object.ref.current.src = object.off) :
                (object.ref.current.src = object.on);

            object.task(object.boolean);

            object.boolean === true ? (object.boolean = false) : (object.boolean = true);
        },
        /**
         * @description a listener function for an onclick event.
         */
        Click = e => {
            let { name } = e.target;
            if (name !== 'endcall') {
                InvokeProcedure(state[name]);
            } else {
                InvokeProcedure(state[name]);
            }
        }
        const localVideoRef = useRef(null),
        remoteVideoRef = useRef(null);

        useEffect(() => {
            navigator.mediaDevices.getUserMedia({audio: true, video:{height: 150, width:150}})
            .then(stream => {
                  localVideoRef.current.srcObject = stream;
            }).catch(err => console.error(err))
        },[])

    return (
        <div>
            <video id="localstream" mute="true" ref={localVideoRef} autoPlay={true}></video>
            <video id="remotestream" ref={remoteVideoRef} autoPlay={true}></video>
            <section id="controls">
                <img src={switchcamera['on']} name="switchcamera" alt="switchcamera" id="switchcamera"
                    ref={switchcamera['ref']} onClick={Click} />

                <img src={screen['on']} name="screen" alt="screen" id="screen"
                    ref={screen['ref']} onClick={Click} />

                <img src={audio['on']} name="audio" alt="audio" id="audio"
                    ref={audio['ref']} onClick={Click} />

                <img src={endcall['on']} name="endcall" alt="endcall" id="endcall"
                    ref={endcall['ref']} onClick={Click} />
            </section>
        </div>
    )
}

export default VideoChatRoom
