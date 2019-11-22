import React from 'react';
import StyledBubble from './StyledBubble'

export default function UserBubble ({ user: { name }, color }) {
  return (
    <StyledBubble width="5%" height="5%"
      color={color}
    >
      <div className="user">
        {name}
      </div>
    </StyledBubble>
  )
}