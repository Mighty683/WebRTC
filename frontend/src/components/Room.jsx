import React from 'react'
import UserBubble from './UserBubble'
import Draggable from 'react-draggable'
import { getColor } from '../helper/colors'

import './Room.sass'

export default function Room ({ room: { name, users }, onDrop, color }) {
  return (
    <Draggable
      bounds="parent"
      onStop={(e) => {onDrop && onDrop(e, name)}}
    >
      <div className="room" style={{
        backgroundColor: color
      }}>
        <div className="title">{name}</div>
        {users && users.map(user => <UserBubble user={user} color={getColor(color)} />)}
      </div>
    </Draggable>
  );
}