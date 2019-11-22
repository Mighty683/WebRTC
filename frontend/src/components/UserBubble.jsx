import React from 'react';

import './Bubble.sass'

export default function UserBubble ({ user: { name }, color }) {
  return (
    <div className="bubble" style={{
      'backgroundColor': color
    }}>
      <div className="user">
        <span>{name}</span>
      </div>
    </div>
  )
}