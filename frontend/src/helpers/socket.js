import io from "socket.io-client";

const pendingConnections = new Map()

const URL = "http://localhost:8080"

// Join to room
export async function connect(roomName, onNewUser) {
  const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
  return new Promise(async (resolve, reject) => {
    let socket = io(URL);
    console.log(`Connection with: ${URL}`)
    // Confirmation of joining to room
    socket.on("joined", (sockets) => {
      console.log(sockets)
      resolve()
    });

    // New user joining
    socket.on("on_join", async ({
      id
    }) => {
      if (id === socket.id) return;
      console.log(`${id} joined Room`)

      const pc = new RTCPeerConnection();
      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      const offer = await pc.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      });

      await pc.setLocalDescription(new RTCSessionDescription(offer));
      pc.addEventListener('icecandidate', function (e) {
        socket.emit("send_ice_candidate", {
          roomName,
          candidate: e.candidate,
          target: id
        });
      })
      socket.emit("send_offer", {
        roomName,
        offer,
        target: id
      });
      pendingConnections.set(id, pc);
    });

    socket.on("on_offer", async ({ offer, id, target }) => {
      if (target === socket.id) {
        console.log(`Received offer from ${id}`);

        const pc = new RTCPeerConnection();
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        pc.addEventListener('icecandidate', function (e) {
          socket.emit("send_ice_candidate", {
            roomName,
            candidate: e.candidate,
            target: id
          });
        })

        await pc.setRemoteDescription(offer);

        let answer = await pc.createAnswer();
        await pc.setLocalDescription(new RTCSessionDescription(answer));
        socket.emit("send_answer", {
          answer,
          roomName,
          target: id,
        });
        pendingConnections.set(id, pc);
        onNewUser({
          id,
          peerConnection: pc
        })
      }
    });

    socket.on("on_answer", async ({ answer, id, target }) => {
      if (target === socket.id) {
        console.log(`Received answer from ${id}`)
        let connection = pendingConnections.get(id)
        if (connection) {
          await connection.setRemoteDescription(new RTCSessionDescription(answer))
          onNewUser({
            id,
            peerConnection: connection
          })
        } else {
          console.log(`No connection for ${id}`)
        }
      }
    });

    socket.on('on_ice_candidate', function ({ candidate, id, target }) {
      if (candidate && target === socket.id) {
        const connection = pendingConnections.get(id);
        if (connection) {
          console.log('Received ICE from', id)
          connection.addIceCandidate(candidate)
        }
      }
    })

    socket.emit("join_room", {
      name: roomName,
    });
  });
}
