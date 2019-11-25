import React, { useRef, useEffect } from "react"
import { Card } from '@material-ui/core'

export default function User ({
  user
}) {
  const videoRef = useRef()
  useEffect(() => {
    setInterval(() => {
      console.log(user.peerConnection.getRemoteStreams())
    }, 5000)
    let [stream] = user.peerConnection.getRemoteStreams();
    if (!stream) {
      user.peerConnection.addEventListener('track', e => {
        console.log('Added track!')
        videoRef.current.srcObject = e.streams[0];
      })
    } else {
      videoRef.current.srcObject = stream;
    }
  })
  return (
    <Card>
      <div>
        {user.id}
        <video ref={videoRef} autoPlay />
      </div>
    </Card>
  )
}