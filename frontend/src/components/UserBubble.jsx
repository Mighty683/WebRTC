import React from 'react';
import Draggable from 'react-draggable';

import './Bubble.sass'

export default function UserBubble ({ user: { name, position }, color, onClick, onDrop }) {
  return (
    <Draggable
      defaultPosition={position}
      bounds="parent"
      onStop={(e) => onDrop && onDrop(e, name)}
    >
      <div className="bubble" style={{
        'backgroundColor': color
      }} onClick={() => onClick && onClick()}>
          <div className="user">
            <span>{name}</span>
          </div>
      </div>
    </Draggable>
  )
}