import React, { useRef, useEffect } from "react"
import { Card } from '@material-ui/core'

export default function User ({
  user
}) {
  const videoRef = useRef()
  useEffect(() => {
    console.log(user.peerConnection.getRemoteStreams())
    debugger;
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