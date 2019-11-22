import React, { useRef, useEffect, useState } from 'react';
import UserBubble from './UserBubble';
import { getColor } from '../helper/colors';
import Draggable from 'react-draggable';
import Styled from '@emotion/styled';

function getContainerCenter (container) {
  return { X: container.offsetWidth / 2, Y: container.offsetHeight / 2 }
}

function calculateX(container, step, count) {
  let { X } = getContainerCenter(container)
  return X + Math.cos(step * count) * X / 2;
}

function calculateY(container, step, count) {
  let { Y }= getContainerCenter(container)
  return Y + Math.sin(step * count) * Y / 2;
}

const Container = Styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f;
`;

export default function Bubble ({ title, users }) {
  const container = useRef(null)
  const [containerSize, setContainerSize] = useState(0)
  const color = '#f0f'

  function initUsers () {
    if (containerSize === 0) { 
      setContainerSize(container.current.offsetWidth)
    }
  }

  useEffect(initUsers)

  return (
    <Container ref={container}>
      {title &&
        <div className="title">{title}</div>
      }
      {!!containerSize && users.map((user, index) => {
      let step = 2 * Math.PI / users.length;
        return (
        <Draggable
          key={user.name}
        >
          <UserBubble
            key={user.name}
            color={getColor(color)}
            user={user}
          />
        </Draggable>)
      })}
    </Container>
  );
}