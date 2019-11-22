import React, { useState } from 'react';
import Bubble from './components/MainBubble';
import Hello from './components/Hello';
import {
  connect
} from './helper/socket';
import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);

  async function initConnection(userName) {
    let response = await connect(userName)
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
