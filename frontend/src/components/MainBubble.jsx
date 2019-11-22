import React, { useRef, useEffect, useState } from 'react';
import UserBubble from './UserBubble';
import { getColor } from '../helper/colors';
import Draggable from 'react-draggable';

import './MainBubble.sass'

export default function Bubble ({ users }) {
  const container = useRef(null)
  const color = '#f0f'
  function onStop () {
    console.log(arguments)
  }
  function onStart () {
    console.log(arguments)
  }

  return (
    <container className="main-bubble" ref={container}>
        {container.current && users.map((user) => 
          <Draggable
            bounds="parent"
            onStart={onStart}
            onStop={onStop}
            key={user.name}
          >
            <div>
              <UserBubble
                className="handle"
                color={getColor(color)}
                user={user}
              />
            </div>
          </Draggable>)
        }
    </container>
  );
}