import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { getColor } from './helper/colors';
import UserBubble from './components/UserBubble';
import Hello from './components/Hello';
import Axios from 'axios';
// import { Modal } from '@material-ui/core';
// import Videos from './components/Videos';

const URL = 'https://bubble-tokbox.herokuapp.com'



function App() {
  const color = "#fff";
  const container = useRef();
  const [users, setUsers] = useState([{
    name: 'Tomek',
  }, {
    name: 'Artur'
  }]);
  const [userName, setUserName] = useState('')
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (!config) {
      Axios.get(`${URL}/room/main`).then((res) => {
        setConfig(res.data)
      });
    }
  });


  function onUserCreate (userName) {
    Axios.post(`${URL}/api/users`, {
      name: userName
    }).then((user) => {
      console.log(user)
      setUserName(userName)
    })
  }

  return (
    <div className="App" ref={container}>
      {!userName && <Hello onChange={onUserCreate} />}
      {userName && container.current &&
        <div style={{
          height: container.current.offsetHeight,
          width: container.current.offsetWidth
        }} className="main-container">
          {!userName && users.map((user) =>
            <UserBubble
              color={getColor(color)}
              user={user}
            />)
          }
        </div>
      }
    </div>
  );
  //{config && <Videos config={config} />}
}

export default App;
