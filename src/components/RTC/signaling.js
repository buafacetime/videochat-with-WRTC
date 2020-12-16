'use strict';

const toJson = (value) => JSON.stringify(value);
const parseJson = (json) => JSON.parse(json);

/**
 * @description websocket signaling server used to
 * exchange session descriptions before peers can
 * use wrtc in the browser.
 */

class Signaling {
	//in production --> 'wss://buafacetime.herokuapp.com', 'echo-protocol'
	#wss = new WebSocket('ws://localhost:3000', 'echo-protocol');
	#roomName;
	constructor(roomName) {
		this.onopen(roomName);
		this.#roomName = roomName;
	}
	/**
	 *
	 * @param {string} roomName
	 */
	onopen(roomName) {
		this.#wss.onopen = (e) => {
			this.#wss.send(
				toJson({
					type: 'EnterRoom',
					roomName,
				})
			);
		};
	}

	/**
	 *
	 * @param {function} callback
	 */
	onmessage(callback) {
		this.#wss.onmessage = (e) => {
			console.log('you got message'); //remove in production.
			//reduce 3 lines  below to 1 line in production
			const message = parseJson(e.data);
		
			switch (message.type) {
				case 'sdpData':
					// console.log('exchanging sdp data');
					callback(message);
					break;
				case 'roomIsFull':
					// cant't use it as line 70 -71 of Class signaling causes react 
					// to re-render a VideoChatRoom  component which,
					// re-invokes the WRTC, eventually such loop ending
					// with roomIsFull case.
					// console.log(message);
					break;
				case 'roomEntered':
					// console.log(message);

					if (message.nOfPeopleInRoom === 2) {
						this.#wss.send(toJson({
							type:'initCall',
							roomName: this.#roomName
						 }));
					}
					break;
				case 'initCall':
					// console.log(message);
					window.initVideoCall();
					break;
				case 'exitRoom':
					this.endVideoChat();
					break;
				default:
					break;
			
			}
		};
	}
	/**
	 *
	 * @param {object} data
	 */
	send(data) {
		data.type = 'wrtcSdpExchange';
		data.roomName = this.#roomName;
		this.#wss.send(toJson(data));
	}
	close() {
		this.#wss.close(
			3000,
			toJson({
				message: 'Your friend left',
				roomName:this.#roomName,
			})
		);
		this.stopStream();
		window.videoCallEnded();
	}
	setStopStream(procedure) {
		this.stopStream = procedure;
	}
}
// Object.freeze(Signalling);

export default Signaling;
