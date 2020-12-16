/*
*@description whiteList contains Doamin's of acceptable 
broswer clients.
*/
const whiteList = [
	'https://buafacetime.github.io',
	'http://localhost:8080', // remove in production
	'http://localhost:8081', //remove in prodcution
];

const clientRegister = new Map();
/**
 *
 * @param {string} key room name
 * @description wrapper around the clientRegister Map dataStruture.
 * @returns {array} Array of sockets.
 */
const getClients = (key) => clientRegister.get(key) || [];
/**
 *
 * @param {string} key room name
 * @param {object} value client websocket to add to repective room
 * @description wrapper around the clientRegister Map dataStruture.
 * @returns undefined.
 */
const setClients = (key, value) => {
	const ary = getClients(key);
	clientRegister.set(key, [...ary, value]);
};

/**
 *
 * @param {string} key room name
 * @description  removes given room from clientRegster.
 */
const deleteClients = (key) => {
	clientRegister.delete(key);
};

/**
 *
 * @param {object} value message object to be sent to client
 * @description turns given input to json.
 * @returns {JSON}
 */
const toJson = (value) => JSON.stringify(value);
/**
 *
 * @param {JSON} object message object recieved from client
 * @description turns given JSON obejct to Javascript Object.
 * @returns {object} object
 */
const parseJson = (json) => JSON.parse(json);

/**
 *
 * @param {string} origin client Domain
 * @description determines if given origin of request is whitelisted.
 * @returns {boolean} boolean
 */
const originIsAllowed = (origin) => whiteList.includes(origin);

module.exports = {
	toJson,
	parseJson,
	originIsAllowed,
	getClients,
	setClients,
	deleteClients,
};
