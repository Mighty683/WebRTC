import React, { useRef } from 'react';
import { Input, Button } from '@material-ui/core';
import Styled from '@emotion/styled'

const HelloStyles = Styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export default function Hello (props) {
  const inputRef = useRef();
  return (
    <HelloStyles>
      <h1>Bubble Team</h1>
      <Input ref={inputRef} />
      <Button onClick={() => {
        props.onChange(inputRef.current.children[0].value)
      }}>ENTER!</Button>
    </HelloStyles>
  )
}