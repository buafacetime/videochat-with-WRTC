"use strict";
/**
 * @returns an Array of public stun servers, used to
 * get peers ip address.
 */
export function stunServers() {
  return [
    { url: "stun:stun.softjoys.com" },
    { url: "stun:stun2.l.google.com:19302" },
    { url: "stun:stun.fwdnet.net" },
  ];
}

/**
 * @returns an Array of public turn servers,
 * used to rely communication if peers cannot
 * communicate directly.
 */
export function turnServers() {
  return [
    {
      url: "turn:numb.viagenie.ca",
      credential: "muazkh",
      username: "webrtc@live.com",
    },

    {
      url: "turn:192.158.29.39:3478?transport=tcp",
      credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
      username: "28224511:1379330808",
    },
  ];
}
