import React, { useState, useEffect, useRef } from 'react';
import Bubble from './components/MainBubble';
import Hello from './components/Hello';
import { Modal } from '@material-ui/core';
import {
  connect
} from './helper/socket';
import './App.css';



function App() {
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [streams, setStreams] = useState(new Map());

  async function initConnection(userName) {
    let response = await connect(userName, "room1", setUsers, setStreams)
    setUserName(userName)
    setUsers(Object.keys(response).map(key => ({
      name: response[key].name
    })))
  }

  function Videos ({streams}) {
    if (streams.length) {
      return (
        <Modal open={true}>
          <div>
            {Array.from(streams.values()).map((value, index) => {
              return <video key={index} ref={video => video.srcObject = value} />
            })}
          </div>
        </Modal>
      )
    } else {
      return false
    }
  }
  return (
    <div className="App">
      <Hello onChange={initConnection} />
      {userName && <Bubble title="Appjobs" color="#f7a504" users={users}/>}
      {<Videos streams={streams} />}
    </div>
  );
}

export default App;
