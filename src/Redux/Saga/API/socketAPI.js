import io from 'socket.io-client';
global.socket = io('https://nhacsong.pro:2021', {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  // transports: ['websocket'],
  agent: false, // [2] Please don't set this to true
  upgrade: false,
  // rejectUnauthorized: false,
});

exports.connect = function(user) {
  return new Promise((thanhcong, thatbai) => {
    try {
      socket.on('connect', () => {
        console.log(socket.connected); // true
        socket.emit('dangkymaychu', msg => {
          console.log(msg);
        });
        socket.on('dangkymaychu', data => {
          thanhcong(data);
        });
      });
    } catch (e) {
      console.log(e);
      thatbai(e);
    }
  });
};

