import React, { useState } from 'react';
import { OTSession, OTStreams, OTSubscriber } from 'opentok-react'
import OTPublisher from 'opentok-react/dist/OTPublisher';
import { Modal, Card } from '@material-ui/core';


export default function Videos ({config}) {
  return (
    <Modal open={true}>
      <OTSession apiKey={config.apiKey} sessionId={config.sessionId} token={config.token}>
        <OTPublisher
          properties={{ publishVideo: true, width: 200, height: 200, }}
        />
        <OTStreams>
          <OTSubscriber
            properties={{ width: 200, height: 200 }}
          />
        </OTStreams>
      </OTSession>
    </Modal>
  )
  
}