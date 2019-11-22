import React, { useState } from 'react';
import { OTSession, OTStreams, OTSubscriber } from 'opentok-react'
import OTPublisher from 'opentok-react/dist/OTPublisher';


export default function Videos ({config}) {
  console.log(config)
  const [publishVideo, setPublishVideo] = useState(false)
  return (
    <OTSession apiKey={config.apiKey} sessionId={config.sessionId} token={config.token}>
      <button id="videoButton" onClick={() => setPublishVideo(!publishVideo)}>
          {publishVideo ? 'Disable' : 'Enable'} Video
        </button>
        <OTPublisher
          properties={{ publishVideo, width: 50, height: 50, }}
        />
        <OTStreams>
          <OTSubscriber
            properties={{ width: 100, height: 100 }}
          />
        </OTStreams>
    </OTSession>
  )
  
}