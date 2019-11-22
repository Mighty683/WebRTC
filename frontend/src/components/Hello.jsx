import React, { useRef } from 'react';

export default function Hello (props) {
  const inputRef = useRef();
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => props.onChange(inputRef.current.value)}>ENTER!</button>
    </div>
  )
}