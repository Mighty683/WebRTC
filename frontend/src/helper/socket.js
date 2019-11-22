import io from "socket.io-client";

const pcs = {};
const tracks = new Map()

export async function connect(userName, roomName, onUsersUpdate, onStreamsUpdate) {
  const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
  return new Promise(async (resolve, reject) => {
    let socket = io("http://localhost:8080");

    socket.on("joined", resolve);

    socket.on("on_join", async ({
      joined,
      all
    }) => {
      const pc = new RTCPeerConnection(null);
      const offer = await pc.createOffer();

      pc.setLocalDescription(new RTCSessionDescription(offer));
      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      pcs[joined] = pc;
      socket.emit("send_offer", {
        roomName,
        offer,
        name: userName,
        target: joined
      });
      onUsersUpdate(Object.values(all));
    });

    socket.on("on_offer", async ({ offer, name, target }) => {
      if (target === userName) {
        const pc = new RTCPeerConnection(null);
        pc.ontrack = (argument) => {
          console.log(argument)
          tracks.set(name, stream)
          onStreamsUpdate(tracks);
        }
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.onnegotiationneeded = async e => {
          if (pc.signalingState !== "stable") return;
          await pc.setRemoteDescription(offer);
          let answer = await pc.createAnswer();
          pc.setLocalDescription(new RTCSessionDescription(answer));
          pcs[name] = pc;
          socket.emit("send_answer", {
            answer,
            roomName,
            target: name,
            name: target
          });
          }
      }
    });

    socket.on("on_answer", async ({ answer, name, target }) => {
      if (target === userName) {
        console.log(answer)
        pcs[name].setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socket.emit("join_room", {
      userName,
      name: roomName,
    });
  });
}
