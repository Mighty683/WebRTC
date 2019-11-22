import React from 'react';
import Styled from '@emotion/styled';

const StyledBubble = Styled.div`
  border-radius: 50%;
  background-color: ${({color}) => color || '#fff'}
`;

export default function Bubble (props) {
  return (
    <StyledBubble color={props.color}>
      {props.title &&
        <div className="title">{props.title}</div>
      }
      {props.children}
    </StyledBubble>
  );
}