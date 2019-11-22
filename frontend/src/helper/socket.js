import io from 'socket.io-client';


export function connect (userName) {
  return new Promise(async (resolve, reject) => {
    let socket= io('http://localhost:8080');
    let pc = new RTCPeerConnection(null);
    let sessionDescription = await pc.createOffer()
    pc.setLocalDescription(sessionDescription);

    socket.on('joined', resolve)
    socket.emit('join_room', {
      userName,
      name: 'room1',
      sessionDescription
    })
  });
}