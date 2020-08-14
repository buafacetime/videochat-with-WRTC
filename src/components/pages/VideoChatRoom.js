import React from 'react';
import camera from "../../svg/switch_cameras.svg"
import screenOff from "../../svg/screen_off.svg"
import screenOn from "../../svg/screen_on.svg"
import audioOn from "../../svg/audio_on.svg"
import audioOff from "../../svg/mute_audio.svg"
import endCall from "../../svg/call_ended.svg"
import callEnded from "../../svg/end_call.svg"

const VideoChatRoom = () => {
    const Click = e => {
        alert(`${e.target.name} clicked`)
    }
    return (
        <div>
            <video id="localstream" mute></video>
            <video id="remotestream"></video>
            <section id="controls">
                <img src={camera} name="switchcamera" alt="switchcamera" id="switchcamera"
                    onClick={Click}
                />

                <img src={screenOff} name="screen" alt="screen" id="screen" onClick={Click} />

                <img src={audioOff} name="audio" alt="audio" id="audio" onClick={Click} />

                <img src={endCall} name="endcall" alt="endcall" id="endcall" onClick={Click} />
            </section>
        </div>
    )
}

export default VideoChatRoom
