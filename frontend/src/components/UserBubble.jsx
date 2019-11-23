import React from 'react';
import Draggable from 'react-draggable';

import './Bubble.sass'

export default function UserBubble ({ user: { name }, color }) {
  return (
    <Draggable>
      <div className="bubble" style={{
        'backgroundColor': color
      }}>
          <div className="user">
            <span>{name}</span>
          </div>
      </div>
    </Draggable>
  )
}