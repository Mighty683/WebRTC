import io from "socket.io-client";

export const pcs = {};

export function connect(userName, roomName) {
  return new Promise(async (resolve, reject) => {
    let socket = io("http://localhost:8080");

    socket.on("joined", resolve);

    socket.on("on_join", async joiningUsername => {
      const pc = new RTCPeerConnection(null);
      let offer = await pc.createOffer();
      pc.setLocalDescription(new RTCSessionDescription(offer));
      pcs[joiningUsername] = pc;
      socket.emit("send_offer", {
        roomName,
        offer,
        name: userName,
        target: joiningUsername
      });
    });

    socket.on("on_offer", async ({ offer, name, target }) => {
      if (target === userName) {
        const pc = new RTCPeerConnection(null);
        let answer = await pc.createAnswer();
        pc.setLocalDescription(new RTCSessionDescription(answer));
        pc.setRemoteDescription(offer);
        pcs[name] = pc;
        socket.emit("send_answer", {
          answer,
          roomName,
          target: name,
          name: target
        });
      }
    });

    socket.on("on_answer", async ({ answer, name, target }) => {
      if (target === userName) {
        pc = pcs[name];
        pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socket.emit("join_room", {
      userName,
      name: roomName,
      sessionDescription
    });
  });
}
