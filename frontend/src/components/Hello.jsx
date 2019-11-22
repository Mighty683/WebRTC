import React, { useRef } from 'react';
import { Input, Button } from '@material-ui/core';

export default function Hello (props) {
  const inputRef = useRef();
  return (
    <div>
      <Input ref={inputRef} />
      <Button onClick={() => {
        console.log(inputRef)
        props.onChange(inputRef.current.children[0].value)
      }}>ENTER!</Button>
    </div>
  )
}