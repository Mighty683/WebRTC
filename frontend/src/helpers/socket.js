import io from "socket.io-client";

const pendingConnections = new Map()

const URL = "http://localhost:8080"

// Join to room
export async function connect(roomName, onNewUser) {
  console.log(`Asking for devices`);
  const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
  console.log(`Stream using ${stream}`);
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

      const pc = new RTCPeerConnection(null);
      const offer = await pc.createOffer();
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
      await pc.setLocalDescription(new RTCSessionDescription(offer));

      socket.emit("send_offer", {
        roomName,
        offer,
        target: id
      });
      pendingConnections.set(id, pc);
    });

    socket.on("on_offer", async ({ offer, id, target }) => {
      if (target === socket.id) {
        const pc = new RTCPeerConnection(null);
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
        await pc.setRemoteDescription(offer);
        let answer = await pc.createAnswer();
        pc.setLocalDescription(new RTCSessionDescription(answer));
        console.log(`Send answer to ${id}`)
        socket.emit("send_answer", {
          answer,
          roomName,
          target: id,
        });
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
          pendingConnections.delete(id)
          connection.setRemoteDescription(new RTCSessionDescription(answer))
          onNewUser({
            id,
            peerConnection: connection
          })
        } else {
          console.log(`No connection for ${id}`)
        }
      }
    });

    socket.emit("join_room", {
      name: roomName,
    });
  });
}
