import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { getColor } from './helper/colors';
import UserBubble from './components/UserBubble';
import Hello from './components/Hello';
import Axios from 'axios';
import Room from './components/Room';
import Videos from './components/Videos';
// import { Modal } from '@material-ui/core';
// import Videos from './components/Videos';

const URL = 'https://bubble-tokbox.herokuapp.com'
const WEB_API = 'https://bubbleteam.herokuapp.com/api'

function getUserInitialPosition (container, index, numOfUsers) {
  let step = Math.PI * 2 / numOfUsers;
  let x = container.offsetWidth / 2;
  let y = container.offsetHeight / 2;
  return {
    x: x + (Math.sin(index * step ) * 100),
    y: y + (Math.cos(index * step ) * 100)
  }
}

function App() {
  const color = "#f7a504";
  const container = useRef();
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [userName, setUserName] = useState('')
  const [config, setConfig] = useState(null);


  async function onUserCreate (userName) {
    const { data: { name } } = await Axios.post(`${WEB_API}/users`, {
      name: userName
    });
    const usersResponse = await Axios.get(`${WEB_API}/users/free`);
    const roomsReponse = await Axios.get(`${WEB_API}/rooms`);
    setUsers(usersResponse.data.map((user, index, array) => ({
      ...user,
      position: getUserInitialPosition(container.current, index, array.length)
    })));
    setUserName(name);
    setRooms(roomsReponse.data);
  }

  async function onUserDrop (e, name) {
    console.log(e, users.map(usr => usr.position))
    let touchedUser = users.find(user => {
      console.log(Math.sqrt(
        (e.screenX - user.position.x)**2 + (e.screenY - user.position.y)**2))
      return user.name !== name && Math.sqrt(
        (e.screenX - user.position.x)**2 + (e.screenY - user.position.y)**2) < 50
    })
    let date = new Date()
    if (touchedUser) {
      await Axios.post(`${WEB_API}/rooms`, {
        roomName: date.toUTCString(),
        userName: name
      })
      let response = await Axios.post(`${WEB_API}/rooms`, {
        roomName: 'Discussion',
        userName: touchedUser.name
      })
      users.splice(users.indexOf(touchedUser), 1)
      users.splice(users.findIndex(user => user.name === name), 1)
      rooms.push(response.data)
      setRooms(rooms)
      setUsers(users)
      Axios.get(`${URL}/room/${date.toUTCString()}`).then((res) => {
        setConfig(res.data)
      });
    } else {
      users.find(user => user.name === name).position = {
        x: e.screenX,
        y: e.screenY
      }
    }
    setUsers(users)
    console.log(e)
  }

  return (
    <div className="App" ref={container}>
      {!userName && <Hello onChange={onUserCreate} />}
      {userName &&
        <div style={{
          height: container.current.offsetHeight,
          width: container.current.offsetWidth
        }} className="main-container">
          {users.map((user) =>
            <UserBubble
              position={user.position}
              key={user.id}
              color={getColor(color)}
              user={user}
              onDrop={onUserDrop}
            />
          )}
          {rooms.map((room) =>
            <Room
              key={room.id}
              room={room}
              color={getColor(color)}
            />
          )}
          {config && <Videos
            config={config}
          />}
        </div>
      }
    </div>
  );
  //{config && <Videos config={config} />}
}

export default App;
