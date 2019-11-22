import React from 'react';
import StyledBubble from './StyledBubble'

export default function UserBubble ({ user: { name }, top, left, parentColor }) {
  return (
    <StyledBubble width="5%" height="5%"
      top={top}
      left={left}
      parentColor={parentColor}
    >
      <div className="user">
        {name}
      </div>
    </StyledBubble>
  )
}