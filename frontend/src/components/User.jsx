import React, { useRef, useEffect } from "react"
import { Card } from '@material-ui/core'

export default function User ({
  user
}) {
  const videoRef = useRef()
  useEffect(() => {
    console.log('Remote Streams:', user.peerConnection);
    console.log('Connection State:', user.peerConnection.connectionState);
    user.peerConnection.addEventListener('track', e => {
      videoRef.current.srcObject = e.streams[0];
    })
  })
  return (
    <Card>
      <div>
        {user.id}
        <video ref={videoRef}/>
      </div>
    </Card>
  )
}