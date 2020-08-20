import React, { useState, useEffect, useRef, Fragment } from "react";
import phone from "../../svg/phone.svg";
import screenOff from "../../svg/screen_off.svg";
import screenOn from "../../svg/screen_on.svg";
import audioOn from "../../svg/audio_on.svg";
import audioOff from "../../svg/mute_audio.svg";
import endCall from "../../svg/call_ended.svg";
import callEnded from "../../svg/end_call.svg";
import WRTCSETUP from "../RTC/setUp.js";

const VideoChatRoom = (props) => {
  const localVideoRef = useRef(null),
    remoteVideoRef = useRef(null),
    chatroomRef = useRef(null);

  const [state, setState] = useState({
      buaInSession: false,
      RTCSetup: new WRTCSETUP(
        localVideoRef,
        remoteVideoRef,
        props.location.state.room
      ),
      startCall: {
        ref: useRef(null),
        boolean: true,
        off: phone,
        on: phone,
        task(bool) {
          switch (bool) {
            case true:
              state.RTCSetup.startVideoChat();

              break;
          }
        },
      },
      screen: {
        ref: useRef(null),
        boolean: true,
        off: screenOff,
        on: screenOn,
        task(bool) {
          switch (bool) {
            case true:
              state.RTCSetup.turnOffLocalStream();
              break;
            case false:
              state.RTCSetup.turnOnLocalStream();
              break;
          }
        },
      },
      audio: {
        ref: useRef(null),
        boolean: true,
        off: audioOff,
        on: audioOn,
        task(bool) {
          switch (bool) {
            case true:
              state.RTCSetup.muteAudio(bool);
              break;
            case false:
              state.RTCSetup.muteAudio(bool);
              break;
          }
        },
      },
      endcall: {
        ref: useRef(null),
        boolean: true,
        off: callEnded,
        on: endCall,
        task(bool) {
          switch (bool) {
            case true:
              state.RTCSetup.endVideoChat();
              break;
          }
        },
      },
    }),
    { buaInSession, startCall, screen, audio, endcall, RTCSetup } = state;

  /**
   * @param {object} object
   * @description Changes source of img clicked and
   *  invokes task method on object param passed in.
   */
  function InvokeProcedure(object) {
    object.boolean === true
      ? (object.ref.current.src = object.off)
      : (object.ref.current.src = object.on);

    object.task(object.boolean);
  }
  /**
   * @description a listener function for an onclick event.
   */
  function Click(e) {
    let { name } = e.target;
    if (name === "endcall" || name === "startCall") {
      let object = state[name];
      InvokeProcedure(object);
      object.boolean = false;
    } else {
      let object = state[name];
      InvokeProcedure(object);
      object.boolean === true
        ? (object.boolean = false)
        : (object.boolean = true);
    }
  }

  useEffect(() => {
    RTCSetup.turnOnLocalStream();

    window.startVideoChat = () => {
      setState({
        ...state,
        buaInSession: true,
      });

      setTimeout(() => setState({ ...state, buaInSession: false }), 5000);
    };
    window.videoCallEnded = () => props.history.push("/");
  }, []);

  return (
    <div id="videoroom" ref={chatroomRef}>
      {buaInSession === true ? (
        <span id="alert">You're Friend has joined, start call</span>
      ) : (
        <> </>
      )}

      <video id="localstream" ref={localVideoRef}></video>

      <video id="remotestream" ref={remoteVideoRef}></video>

      <section id="controls">
        <button className="videoBtn" id="startCall" onClick={Click}>
          <img
            src={startCall["on"]}
            name="startCall"
            alt="startCall"
            title="video call button"
            ref={startCall["ref"]}
          />
        </button>
        <button className="videoBtn" id="screen">
          <img
            src={screen["on"]}
            name="screen"
            alt="screen"
            ref={screen["ref"]}
            onClick={Click}
          />
        </button>

        <button className="videoBtn" id="audio">
          <img
            src={audio["on"]}
            name="audio"
            alt="audio"
            ref={audio["ref"]}
            onClick={Click}
          />
        </button>
        <button className="videoBtn" id="endcall">
          <img
            src={endcall["on"]}
            name="endcall"
            alt="endcall"
            ref={endcall["ref"]}
            onClick={Click}
          />
        </button>
      </section>
    </div>
  );
};

export default VideoChatRoom;
