export const environment = {
  production: true,
  wsEndpoint: 'wss://cukbook.online/ws',
  RTCPeerConfiguration: {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302'
      }
    ]
  }
};
