import React, { useState, useEffect } from 'react';
import Bubble from './components/MainBubble';
import Hello from './components/Hello';
import Videos from './components/Videos';
import Axios from 'axios';
// import { Modal } from '@material-ui/core';
import './App.css';

const URL = 'https://bubble-tokbox.herokuapp.com/'



function App() {
  const [users, setUsers] = useState([]);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (!config) {
      Axios.get(`${URL}/room/main`).then((res) => {
        setConfig(res.data)
      });
    }
  });

  return (
    <div className="App">
      <Hello />
        {users.length && <Bubble title="Appjobs" color="#f7a504" users={users}/>}
      {config && <Videos config={config} />}
    </div>
  );
}

export default App;
