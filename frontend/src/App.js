import React, { useState } from 'react';
import Bubble from './components/MainBubble';
import Hello from './components/Hello';
import {
  connect,
  pcs
} from './helper/socket';
import './App.css';



function App() {
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);

  const onUpdate = newPeer => {
    console.log(newPeer);
    const answerSessionDescription = await pc.createAnswer();
    pc.setRemoteDescription(new RTCSessionDescription(newPeer.sessionDescription));
  }

  async function initConnection(userName) {
    let response = await connect(userName, "room1")
    setUserName(userName)
    setUsers(Object.keys(response).map(key => ({
      id: key,
      name: response[key].name
    })))
  }

  return (
    <div className="App">
      <Hello onChange={initConnection} />
      {userName && <Bubble title="Appjobs" color="#f7a504" users={users}/>}
    </div>
  );
}

export default App;
